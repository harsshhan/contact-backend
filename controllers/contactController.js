const Contact = require('../models/contactModel')
const asyncHandler = require('express-async-handler')
// @desc Get all contacts
// @route GET /api/contacts
// @access Private

const getContacts = asyncHandler(async (req, res) => {

    const contacts = await Contact.find({user_id:req.user.id});
    if(!contacts){
        res.status(400);
        throw new Error("Contacts not found");
    }
    res.status(200).json(contacts);
});

// @desc Create new contact
// @route POST /api/contacts
// @access Private
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phno } = req.body

    if (!req.body || !name || !email || !phno) {
        res.status(401)
        throw new Error("All fields are mandatory !")
    }
    const contact = await Contact.create({
        name, email, phno, user_id: req.user.id
    })
    res.status(201).json(contact);
});

// @desc Get contact
// @route GET /api/contacts/:id
// @access Private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User dont have permission to update this contact");
    }
    res.status(200).json(contact);
});

// @desc Update contact
// @route PUT /api/contacts/:id
// @access Private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User dont have permission to update this contact");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedContact);
});

// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access Private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User dont have permission to update this contact");
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contact);
});

module.exports = { createContact, getContacts, getContact, updateContact, deleteContact };