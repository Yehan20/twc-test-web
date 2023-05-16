import React from 'react'

const MessagePromptModal = ({deleteUser,togglePromptModal, deleteContact}) => {
 
  return (
    <div className="fixed inset-0 " id="modal-overlay">
    <div className="w-full px-10 text-center modal-form fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg " id="modal-content">
        <p className="text-heading-medium text-greenColor mb-4">Are you sure Wanto delete the contact {deleteUser.fullName} </p>

        <button onClick={()=>deleteContact(deleteUser._id)} className="modal-button text-lg inline-block outline-greenColor outline-2 bg-white text-greenColor px-7 py-2">
            Yes
        </button>
         <button onClick={togglePromptModal} className="modal-button text-lg inline-block bg-greenColor text-white px-7 py-2">
            Cancel
        </button>
    </div>
</div>
  )
}

export default MessagePromptModal