import React, { useCallback, createContext, useReducer, useContext, useState, useEffect } from "react"
import { generateUUID } from 'pubnub';
import PubNub, { SubscribeParameters } from "pubnub";
import keyConfiguration from "../src/config/pubnub-keys.json";
import { debug } from "console";
import Blank from './';

//This is where you define the chat app properties.
export const appData: AppState = {
  presence: true, // Enable or disable presence. REQUIRED FOR SUPPORT CHAT DEMO
  presenceLastUpdated: 0, // Last time that a presence event was used to update the activeUsers list. Used to prevent duplicate events from triggering multiple calls to hereNow. 
  history: true, // Enable or disable history.
  historyMax: 10, // How many messages to load from history (max 100).
  maxMessagesInList: 200, // Max number of messages at most in the message list.
  selfAvatar: "https://ui-avatars.com/api/?name=Support+Agent?size=100&rounded=true&uppercase=true&bold=true&background=008B8B&color=000", //The URL for the avatar graphic file
  selfName: "Support Agent", // Set the display name to be the same as the UUID. You can make this whatever you want.
  messages: [{
    message: "← Select a conversation from the user list to start chatting.",
    senderName: "Support Dashboard Alert",
    userAvatar: "https://ui-avatars.com/api/?name=Support+Dashboard?size=100&rounded=true&uppercase=true&bold=true&background=FB0106&color=FFF"
  }], // Array of UserMessages. - In support chat we preload with a message to prompt the agent to start a conversation.
  activeUsers: [], // Array of active users.
  channel: "support", // The root chat channel. In this demo this channel is used for presence.
  activeChannel: "", // // In the support demo this is used to set the active channel that should be used for messages. The generated name from the client is used to create a support channel for that user.
  pubnub: new PubNub({
    publishKey: keyConfiguration.publishKey, // See config/pubnub-keys.json.
    subscribeKey: keyConfiguration.subscribeKey, // See config/pubnub-keys.json.
    uuid: "Support Agent" // Use the UUID for identification on PubNub. 
  }),
  message: "",
}

//This is the default settings for your chat app.
export interface AppState {
  presence: boolean,
  presenceLastUpdated: number,
  history: boolean,
  historyMax: number,
  maxMessagesInList: number,
  message: string;
  selfAvatar: string,
  selfName: string,
  messages: Array<string>,
  activeUsers: Array<string>,
  pubnub: PubNub,
  channel: string 
}

type Action =
  {
    type: "ADD_MESSAGE",
    payload: string
  }
  |{
    type: "ADD_HISTORY",
    payload: Array<string>
  }
  | {
    type: "ADD_ACTIVEUSERS",
    payload: Array<string>
  }
  | {
    type: "SEND_MESSAGE",
    payload: {
      messageContent: string
    }
  }
  | {
    type: "CHANGE_CHANNEL",
    payload: string
  }
  
interface AppStateContextProps {
  state: AppState,
}

export const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
)

export const asyncDispatchMiddleware = store => next => action => {
  let syncActivityFinished = false;
  let actionQueue = [];

  function flushQueue() {
    actionQueue.forEach(a => store.dispatch(a)); // flush queue
    actionQueue = [];
  }

  function asyncDispatch(asyncAction) {
    actionQueue = actionQueue.concat([asyncAction]);

    if (syncActivityFinished) {
      flushQueue();
    }
  }

  const actionWithAsyncDispatch =
      Object.assign({}, action, { asyncDispatch });

  next(actionWithAsyncDispatch);
  syncActivityFinished = true;
  flushQueue();
};

//The functions below are accessible through passing parameters to a dispatch function always accessible in our components. 
export const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {

    //ADD_MESSAGE adds an incoming message to our internal MessageList buffer.
    case "ADD_MESSAGE": {
      //If the messagelist is over our cap we discard the oldest message in the list.
      if (state.messages.length > state.maxMessagesInList ){
        state.messages.shift();
      }

      const addMessage: AppState = {
        ...state,
        messages: [
          ...state.messages as Array<string>,
          {
            ...action.payload as Array<string>
          }
        ]
      };

      return addMessage;
    }
     //ADD_HISTORY prepends array of messages to our internal MessageList buffer.
    case "ADD_HISTORY": {
       const historyMerged: AppState = {
        ...state,
        messages: [
          ...action.payload as Array<string>,
          ...state.messages as Array<string>
        ]
      };

      //If the messagelist is over our cap we discard the oldest messages in the list.
      if (state.messages.length > state.maxMessagesInList) {
        state.messages.slice(state.messages.length-state.maxMessagesInList, state.messages.length);
      }

      return historyMerged;
    }
    //ADD_ACTIVEUSERS replaces array of users in our internal activeUsers buffer.
    case "ADD_ACTIVEUSERS": {
       const activeUsersList: AppState = {
        ...state,
        activeUsers: [
          ...action.payload as Array<string>
        ]
      };
      return activeUsersList;
    }
    // Publishes a message to chat channel.
    case "SEND_MESSAGE": {
      if (state.activeChannel == "") {
        alert("Select a conversation from the user list first to send messages.");
      } else {
        state.pubnub.publish({
          channel: state.activeChannel,
          message: {
            "message": action.payload,
            "userAvatar": state.selfAvatar,
            "senderName": state.selfName,
          },
        });
      }
      return { ...state }
    }
    // Unsubscribes from activeChannel and subscribes to new channel.
    case "CHANGE_CHANNEL": {
      if (state.activeChannel != "support."+action.payload) {

        var historyMessages: Array<string> = [];

        state.pubnub.history(
          {
              channel: state.channel+"."+action.payload,
              count: state.historyMax // Limit of 100 messages.
          },
          (status, response) => { 
            if (typeof response.messages !== "undefined" && response.messages.length > 0) {
              for (var i = 0; i <= response.messages.length; i++) {
                if (typeof response.messages[i] !== "undefined") {
                  historyMessages.push(response.messages[i].entry);
                }
              }
            } else {
              historyMessages.push({
                message: "Send a message to "+action.payload+" to start the conversation.",
                senderName: "Support Dashboard Alert",
                userAvatar: "https://ui-avatars.com/api/?name=Support+Dashboard?size=100&rounded=true&uppercase=true&bold=true&background=FB0106&color=FFF"
              });
            }
          }
        );

        const changeChannelState: AppState = {
          ...state,
          messages: historyMessages,
          activeChannel: state.channel+"."+action.payload
        };

        return changeChannelState; 
      }
      return { ...state }
    }

    default: {
      return state
    }
  }
}

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {

  const [state, dispatch] = useReducer(appStateReducer, appData)

  useEffect(() => {
    try {
      //This where PubNub receives messages subscribed by the channel.
      state.pubnub.addListener({
        message: (messageEvent) => {
          //console.log(`RECEIVING MESSAGE ${messageEvent.message.key}`);
          if (messageEvent.channel == state.activeChannel) { // Only add messages sent to activeChannel
            dispatch({
              type: "ADD_MESSAGE",
              payload: messageEvent.message
            });
          }
        },
        presence: function(p) {
          if (state.presenceLastUpdated != p.timestamp) { // Avoiding making multiple hereNow calls.
            state.presenceLastUpdated = p.timestamp;
            state.pubnub.hereNow(
                {
                    channels: [state.channel],
                    includeUUIDs: true // In this demo we're using the uuid as the user's name. You could also use presence state to provide a username and more. In this app all we need is the UUID of online users.
                },
                (status, response) => {
                  if (response.channels[state.channel].occupancy > 0) {
                    var newActiveUsers: Array<string> = [];
                    for (var i = response.channels[state.channel].occupancy-1; i >= 0 ; i--) {
                      if (response.channels[state.channel].occupants[i].uuid !== "Support Agent") { // Don't include yourself on the list.
                        newActiveUsers.push(response.channels[state.channel].occupants[i].uuid); 
                      }
                    }
                    newActiveUsers.sort(); // This prevents a users name from moving in the list.
                    dispatch({
                      type: "ADD_ACTIVEUSERS",
                      payload: newActiveUsers
                    });
                  }
                }
            );
          }
        }
      });

      /* Not used in the support app dashboard because we want history enabled in active chats but not for the default global channel. 
      if (state.history) {
        //Get the history on the default channel.
        state.pubnub.history(
            {
                channel: state.channel,
                count: state.historyMax // Limit of 100 messages.
            },
            (status, response) => { 
              if (typeof response.messages !== "undefined" && response.messages.length > 0) {
                var historyMessages: Array<string> = [];
                for (var i = 0; i <= response.messages.length; i++) {
                  if (typeof response.messages[i] !== "undefined") {
                    historyMessages.push(response.messages[i].entry)
                  }
                }
                dispatch({
                  type: "ADD_HISTORY",
                  payload: historyMessages
                });
              }
            }
        );
      }
      */

      // Subscribe on the default channel.
      state.pubnub.subscribe(
        {
          channels: [state.channel, state.channel+".*"], // Subscribe to global channel for presence events from chat clients and to the wildcard for all sub channels for chat messages.
          withPresence: state.presence, 
        }
      );

    } catch (e) {
      console.log(`Subscribe error ${e.message}`);
    }

  }, [state.activeChannel]);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}

export const useAppState = () => {
  return useContext(AppStateContext)
}
