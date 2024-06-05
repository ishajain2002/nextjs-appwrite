import { Client, Account, Databases } from 'appwrite';
const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66597cea00333e92c0a9');

export const account= new Account(client);
