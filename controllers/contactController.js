const Contact = require('../models/contactModel')
const asyncHandler = require('express-async-handler')
// @desc Get all contacts
// @route GET /api/contacts
// @access Public

const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

// @desc Create new contact
// @route POST /api/contacts
// @access Public
const createContact = asyncHandler(async(req, res) => {
    const {name,email,phno} = req.body

        if (!req.body || !name || !email || !phno) {
            res.status(401)
            throw new Error("All fields are mandatory !")
        }
        const contact = await Contact.create({
            name,email,phno
        })
        res.status(201).json(contact);
});

// @desc Get contact
// @route GET /api/contacts/:id
// @access Public
const getContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);

    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contact);
});

// @desc Update contact
// @route PUT /api/contacts/:id
// @access Public
const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);

    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedContact);
});

// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access Public
const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    console.log(contact)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contact);
});

module.exports = { createContact, getContacts, getContact, updateContact, deleteContact };