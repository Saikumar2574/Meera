"use client";
import React, { useState, useEffect } from "react";
import {
  addWishlist,
  addWishlistItem,
  getWhishlistDetails,
} from "../service/getData";
import { Modal, Button, Radio } from "flowbite-react";

function WishlistModal({ showModal, setShowModal, productId }) {
  const [list, setList] = useState([]);
  const [creatingNew, setCreatingNew] = useState(false);
  const [newWishlistName, setNewWishlistName] = useState("");
  const [selectedWishlist, setSelectedWishlist] = useState(null);

  const getWishList = async () => {
    const res = await getWhishlistDetails();
    if (res?.wishlists) {
      setList(res?.wishlists);
    }
  };

  const addToWishlist = async () => {
    const res = await addWishlistItem(selectedWishlist, productId);
    if (res) {
      // setProductId(null);
      setShowModal(false);
    }
  };

  useEffect(() => {
    getWishList();
  }, []);

  useEffect(() => {
    if (list?.length > 0) setSelectedWishlist(list?.[0]?._id);
  }, list);

  const handleNewWishlistCreation = () => {
    setCreatingNew(true);
  };

  const handleSaveNewWishlist = async () => {
    if (newWishlistName.trim() !== "") {
      const res = await addWishlist(newWishlistName);
      if (res) {
        getWishList();
        setCreatingNew(false);
        setNewWishlistName("");
      }
    }
  };

  return (
    <>
      <Modal
        theme={{
          content: { base: "relative h-full w-full p-4 md:h-auto w-[550px]" },
          footer: {
            base: "flex items-center space-x-2  py-2 px-6 justify-end",
          },
        }}
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        <Modal.Header>Select a Wishlist</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            {list.map((wishlist) => (
              <div key={wishlist._id} className="flex items-center">
                <Radio
                  id={wishlist._id}
                  name="wishlist"
                  value={wishlist._id}
                  checked={selectedWishlist === wishlist._id}
                  onChange={() => setSelectedWishlist(wishlist._id)}
                />
                <label
                  htmlFor={wishlist._id}
                  className="ml-2 text-sm font-medium uppercase"
                >
                  {wishlist.wishlist_name}
                </label>
              </div>
            ))}
            <div>
              {creatingNew ? (
                <div className="flex items-center mt-6">
                  <input
                    type="text"
                    value={newWishlistName}
                    onChange={(e) => setNewWishlistName(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-2 w-full"
                    placeholder="New Wishlist Name"
                  />
                  <Button onClick={handleSaveNewWishlist} className="ml-2">
                    Add
                  </Button>
                  <Button
                    onClick={() => setCreatingNew(false)}
                    className="ml-2"
                    color="light"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <a
                  href="#"
                  onClick={handleNewWishlistCreation}
                  className="text-blue-500 underline"
                >
                  + Create New
                </a>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => setShowModal(false)}
            className="ml-2"
            color="light"
          >
            Cancel
          </Button>
          <Button className="ml-2" onClick={addToWishlist}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default WishlistModal;
