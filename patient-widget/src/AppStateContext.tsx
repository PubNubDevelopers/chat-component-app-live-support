import React, { useCallback, createContext, useReducer, useContext, useState, useEffect } from "react"
import { generateUUID } from 'pubnub';
import PubNub, { SubscribeParameters } from "pubnub";
import keyConfiguration from "../src/config/pubnub-keys.json";
import { debug } from "console";
import Blank from './';
import DOMPurify from 'dompurify';

const generatedName: string = generateName(); // This is the UUID that we use for identification. 

//This is where you define the chat app properties.
export const appData: AppState = {
  presence: true, // Enable or disable presence.
  presenceLastUpdated: 0, // Last time that a presence event was used to update the activeUsers list. Used to prevent duplicate events from triggering multiple calls to hereNow. 
  history: false, // Enable or disable history.
  historyMax: 10, // How many messages to load from history (max 100).
  maxMessagesInList: 200, // Max number of messages at most in the message list.
  selfAvatar: "https://ui-avatars.com/api/?name="+generatedName+"?size=100&rounded=true&uppercase=true&bold=true&background=057D29&color=FFF", //The URL for the avatar graphic file
  selfName: generatedName, // Set the display name to be the same as the UUID. You can make this whatever you want.
  messages: [{
    message: "You're connected to a doctor. What can I help you with today?",
    senderName: "Dr. Real-time",
    userAvatar: "https://uc.uxpin.com/files/879252/879907/asian_young_main_group_hospital_professional-c0ba747cc87f47e9e774a98d96ab200e.png"
  }], // Array of UserMessages. - In healthcare chat we preload with a message to prompt the user to respond.
  activeUsers: [], // Array of active users.
  channel: "doctor", // The global chat channel. - Used only for presence in healthcare chat demo. 
  activeChannel: "doctor."+generatedName, // In the healthcare demo this is used to set the active channel that a user should use for messages. The generated name is used to create a support channel for that user.
  pubnub: new PubNub({
    publishKey: keyConfiguration.publishKey, // See config/pubnub-keys.json.
    subscribeKey: keyConfiguration.subscribeKey, // See config/pubnub-keys.json.
    uuid: generatedName // Use the UUID for identification on PubNub. 
  }),
  message: "",
}

function capFirst(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateName(): string{
  var name1 = ["Darwin","Natalee","Ryann","Maggie","Scarlet","Kassidy","Matteo","Ethen","Zain","Vivian","Tess","Krystal","Liberty","Brielle","Jaycee","Sylvia","Eden","Arianna","Martha","Jayson","Lainey","Jorden","Daniela","Mohammad","Kathleen","Reuben","Shane","Annie","Logan","Bo","Darius","Nadia","Cristal","Reid","Thomas","Anna","Javion","Gabriel","Bennett","Jerimiah","Connor","Bryant","Parker","Livia","Ellie","Esteban","Morgan","Toby","Saige","Imani","Semaj","Manuel","Ansley","Miah","Ezequiel","Makenzie","Vincent","Jacquelyn","Rowan","Leyla","Evangeline","Ella","Briana","Aaron","Ciara","Karla","Jeffrey","Damarion","Raul","Derick","Jarrett","Frances","Xiomara","Monica","Deon","Abigail","Beau","Angel","Reese","Kylee","Ana","Laci","Madden","Kaleigh","Eduardo","Leilani","Aron","Samson","Trevon","Cloe","Jillian","Avery","Skylar","Autumn","Lesly","Gael","Emilio","Mylee","Courtney","Francesca","Jaydan","Josie","Victoria","Jan","Iliana","Alannah","Veronica","Izaiah","Stacy","Callie","Cynthia","Gilberto","Katelynn","Jaylen","Anahi","Olivia","Lincoln","Niko","Kiana","Harold","Lauren","Adyson","Jewel","Adriana","Mike","Eve","Johanna","Maximillian","Jakayla","Tatiana","Jake","Tony","Marlene","Sara","Jaylynn","Jeffery","Bryson","Jesus","Odin","Anderson","Chris","Cadence","Alfredo","Janiah","Matias","Camren","Nehemiah","Cannon","Dillon","Kierra","Lila","Janet","Jaelyn","Roland","Deacon","Lilly","Mallory","Ryan","Leo","Carleigh","Emma","Evelyn","Jordin","Blaine","Maleah","Clayton","Ryker","Gerald","Zack","Alfred","Julianna","Finn","Yadira","Bailey","Jaylan","Cesar","Arielle","Michaela","Tyson","Lindsey","Elias","Carla","Aedan","Ashley","Charles","Enzo","Luis","Killian","Samir","Reece","Yandel","Teresa","Mckinley","Kendra","Camryn","Zavier","Cody","Ralph","Brooklynn","Casey","Maeve","Jayvon","Davion","Giada","Cierra","Marshall","Alyvia","Rodolfo","Demarion","Hana","Esther","Jose","Alena","Kamren","Deven","Tianna","Beckett","Phoenix","Cayden","Hazel","Denise","Kingston","Charlie","Miguel","Carissa","Jairo","Adolfo","Kaley","Jaron","Miracle","Micaela","Ally","Louis","Kyan","Nicolas","Steve","Jackson","Mckenzie","Drake","Willie","Cali","Joanna","Kareem","Halle","Amina","Chandler","Melanie","Darian","Hassan","Keyla"];
  var name2 = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  var first = capFirst(name1[getRandomInt(1, name1.length)]);
  var last = capFirst(name2[getRandomInt(1, name2.length)]);
  return (first + last);
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
  | {
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

interface AppStateContextProps {
  state: AppState,
}

export const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
)

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

      state.pubnub.publish({
        channel: state.activeChannel, // Publish support client message to active channel.
        message: {
          "message": DOMPurify.sanitize(action.payload as string) as string, 
          "senderName": state.selfName as string,
        },
      });

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
          messageEvent.message.message = DOMPurify.sanitize(messageEvent.message.message as string) as string;
          if (messageEvent.channel == state.activeChannel) { // Only add messages sent to activeChannel
            dispatch({
              type: "ADD_MESSAGE",
              payload: messageEvent.message
            });
          }
        }
      });

      // Subscribe on the default channel.
      state.pubnub.subscribe(
        {
          channels: [state.channel, state.activeChannel], // Subscribe to both the global and active channel.
          withPresence: state.presence, 
        }
      );

    } catch (e) {
      console.log(`Subscribe error ${e.message}`);
    }

  }, [appData]);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}

export const useAppState = () => {
  return useContext(AppStateContext)
}
