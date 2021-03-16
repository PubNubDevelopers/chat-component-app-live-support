# Heathcare Doctor Patient Chat App 
### Featuring Reusable PubNub React Chat Components 

<a href="https://www.pubnub.com/">
    <img align="right" alt="Support Chat Dashboard Demo" src="https://github.com/PubNubDevelopers/chat-component-app-live-support/blob/master/support_dashboard.png" width=400/>
</a>

Building a healthcare chat app in React? This is a alternate version of the support style chat experience created for healthcare. 

This project is a collection of reusable chat components that makes it simple to get started with PubNub in React. Each of the components are designed to be reusable, expandable, and easy to use in another React application. Anyone can build a robust chat app by using these components as a starting point. This project was build from components taken from [Simple Group Chat App](https://github.com/PubNubDevelopers/chat-component-app-simple).

This project is an example of a doctor<>patient support style chat experience using reusable chat components. It includes the basic features you would expect from a heathcare chat app and includes both the client chat widget and a doctor dashboard.

*Important Note:* This project is a work in progress. It may contain incomplete code. Pull requests to fix bugs and add features are always welcomed.

## Included Components:
- Selectable Active Patient List (in dashboard view only) - Displays a list of the available patients in the chat and a total count of patients. Select a patient to start a one on one chat.
- Message List - Displays the messages received in the chat and the chat history when a patient is selected.
- Compose - Provides input area for sending new messages to the chat.

<a href="https://www.pubnub.com/">
    <img align="right" alt="Support Chat Client Widget Demo" src="https://github.com/PubNubDevelopers/chat-component-app-live-support/blob/master/client_support_chat.png" width=400/>
</a>

## Components Coming Soon:
- Emoji - Adds emojis to the Compose component.
- Message Preview - Adds message previews to the Active Users component.
- Typing Indicator - Add typing indicator to the Compose component.
- Read Receipts - Updates Message List component with a timestamp of when messages were last read. 

## Notable Features:
- One on one style chat with automatic creation of new chats and users.
- [PubNub Presence](https://www.pubnub.com/products/presence/) powered user activity.
- Message history.
- [Channel Wildcards](https://www.pubnub.com/docs/platform/channels/channel-management) are used to efficently manage multiple channels.

## Requirements
- [Node.js](https://nodejs.org/en/)
- [PubNub Account](#pubnub-account) (*Free*) 

<a href="https://dashboard.pubnub.com/signup">
    <img alt="PubNub Signup" src="https://i.imgur.com/og5DDjf.png" width=260 height=97/>
</a>

## PubNub Account and App Setup

1. You’ll first need to sign up for a [PubNub account](https://dashboard.pubnub.com/signup/). Once you sign up, you can get your unique PubNub keys from the [PubNub Developer Portal](https://admin.pubnub.com/).

1. Sign in to your [PubNub Dashboard](https://dashboard.pubnub.com/).

1. Click **Create New App**.

1. Give your app a name, and select **Chat App** as the app type.

1. Click **Create**.

1. Click your new app to open its settings, then click its keyset.

1. [Enable the Channel Presence feature](https://support.pubnub.com/support/solutions/articles/14000043562-how-do-i-enable-the-channel-presence-feature-/) for your keyset.

1. [Enable the Storage and Playback feature](https://support.pubnub.com/support/solutions/articles/14000043644-how-do-i-enable-the-message-history-feature-) for your keyset.

1. [Enable the Stream Controller feature](https://support.pubnub.com/support/solutions/articles/14000043662-how-do-i-enable-wildcard-subscribe-for-my-pubnub-keys-) for your keyset.

1. Copy the Publish and Subscribe keys for the next step.

## Building and Running

1. You'll need to run the following commands from your terminal.

1. Clone the GitHub repository.

    ```bash
    git clone https://github.com/PubNubDevelopers/chat-component-app-live-support.git
    ```

1. Navigate into repo:

    ```bash
    cd chat-component-app-live-support
    ```
1. There are two react apps (support dashboard and client widget). You'll need to configure and run both to try the demo. 

1. Select an app:

    ```bash
    cd support-agent-dashboard
    ```

    OR

    ```bash
    cd support-client-widget
    ```

1. Open src/config/pubnub-keys.json. **Replace YOUR_PUBLISH_KEY_HERE and YOUR_SUBSCRIBE_KEY_HERE** with your keyset from your [PubNub Dashboard](https://dashboard.pubnub.com/). YOU MUST DO THIS FOR BOTH THE CLIENT AND DASHBOARD APPS. Use the same keyset for both apps.

1. Install the node modules.

    ```bash
    npm install
    ```

1. Run the project in your local environment.

    ```bash
    npm start
    ```

    **A web browser should automatically open!** You must start both the support dashboard and client widget apps to begin chatting. If it doesn't open try navigating to http://localhost:8080/ and/or http://localhost:8081/ 


## Further Information

Checkout [PubNub Chat Docs](https://www.pubnub.com/docs/chat) page for more information about how to use the React and Redux SDKs to add in-app chat to your applications.

