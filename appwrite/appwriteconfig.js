import { Client, Account, Databases } from 'appwrite';
const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('666038ab00035cd3c9be');

export const account= new Account(client);
