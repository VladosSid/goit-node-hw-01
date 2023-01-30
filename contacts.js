const fs = require("fs").promises;
const path = require("path");
const ID = require("nodejs-unique-numeric-id-generator");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  console.table(data);
}

async function getContactById(contactId) {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));

  console.table(data.filter((contact) => contact.id === contactId));
}

async function removeContact(contactId) {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));

  const newListContscts = data.filter((contact) => contact.id !== contactId);

  fs.writeFile(contactsPath, JSON.stringify(newListContscts), "utf8");

  console.table(newListContscts);
}

async function addContact(name, email, phone) {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));

  const newContacts = {
    id: ID.generate(new Date().toJSON()),
    name,
    email,
    phone,
  };

  data.push(newContacts);

  fs.writeFile(contactsPath, JSON.stringify(data), "utf8");

  console.table(data);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
