import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

// const targetArr = initialFriends.find((friend) => friend.id === 499476);

export default function App() {
  const [selected, setSelected] = useState("");
  const [friends, setFriends] = useState(initialFriends);

  function handleAddFriends(friend) {
    setFriends((friends) => [...friends, friend]);
  }

  return (
    <div className="app">
      <Sidebar
        onAddFriends={handleAddFriends}
        friends={friends}
        selected={selected}
        setSelected={setSelected}
      />
      {selected ? (
        <SplitBill friend={friends.find((friend) => friend.id === selected)} />
      ) : null}
    </div>
  );
}

function Sidebar({ onAddFriends, friends, selected, setSelected }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sidebar">
      <FriendList
        friends={friends}
        selected={selected}
        setSelected={setSelected}
      />

      {!isOpen ? (
        <button className="button" onClick={() => setIsOpen(!isOpen)}>
          Add friend
        </button>
      ) : (
        <AddFriend
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onAddFriends={onAddFriends}
        />
      )}
    </div>
  );
}

function AddFriend({ isOpen, setIsOpen, onAddFriends }) {
  const [inputFriendName, setInputFriendName] = useState("");
  const [inputImageUrl, setInputImageUrl] = useState(
    "https://i.pravatar.cc/48"
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (!inputFriendName) return;

    const newFriend = {
      id: Date.now(),
      name: inputFriendName,
      image: inputImageUrl,
      balance: 0,
    };

    onAddFriends(newFriend);

    setInputFriendName("");
    setInputImageUrl("https://i.pravatar.cc/48");
  }

  return (
    <div className="sidebar">
      <form className="form-add-friend" onSubmit={handleSubmit}>
        <label>🧑‍🤝‍🧑 Friend name</label>
        <input
          type="text"
          value={inputFriendName}
          onChange={(e) => setInputFriendName(e.target.value)}
        ></input>
        <label>🌄 Image URL</label>
        <input
          type="text"
          value={inputImageUrl}
          onChange={(e) => setInputImageUrl(e.target.value)}
        ></input>
        <button className="button" type="submit">
          Add
        </button>
      </form>
      <button className="button" onClick={() => setIsOpen(!isOpen)}>
        Close
      </button>
    </div>
  );
}

function FriendList({ friends, selected, setSelected }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          id={friend.id}
          name={friend.name}
          profile={friend.image}
          balance={friend.balance}
          selected={selected}
          setSelected={setSelected}
        />
      ))}
    </ul>
  );
}

function Friend({ id, name, profile, balance, selected, setSelected }) {
  // const [selected, setSelected] = useState(false);

  function handleSelect() {
    setSelected((currentId) => (currentId === id ? "" : id));
  }

  return (
    <div className="sidebar">
      <li className={`${selected === id ? "selected" : ""}`}>
        <img src={profile} alt="profile"></img>
        <h3>{name}</h3>
        <p className={balance < 0 ? `red` : balance > 0 ? `green` : ``}>
          {balance < 0
            ? `You owe ${name} ${Math.abs(balance)}€`
            : balance > 0
            ? `${name} owes you ${balance}€`
            : `You and ${name} are even`}
        </p>

        <button className="button" onClick={handleSelect}>
          {selected === id ? "Close" : "Select"}
        </button>
      </li>
    </div>
  );
}

function SplitBill({ friend }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {friend.name}</h2>
      <label>💰 Bill value</label>
      <input type="text"></input>
      <label>🧍‍♀️ Your expense</label>
      <input type="text"></input>
      <label>👫 name's expense</label>
      <input disabled></input>
      <label>🤑 Who is paying the bill</label>
      <select type="text">
        <option>You</option>
        <option>name</option>
      </select>
      <button className="button">Split bill</button>
    </form>
  );
}
