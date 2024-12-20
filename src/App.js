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

export default function App() {
  return (
    <div className="app">
      <Sidebar />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="sidebar">
      <FriendList />
      <button className="button">Add friend</button>
    </div>
  );
}

function FriendList() {
  return (
    <ul>
      {initialFriends.map((friend) => (
        <Friend
          id={friend.id}
          name={friend.name}
          profile={friend.image}
          balance={friend.balance}
        />
      ))}
    </ul>
  );
}

function Friend({ id, name, profile, balance }) {
  return (
    <div className="sidebar">
      <li>
        <img src={profile} alt="profile"></img>
        <h3>{name}</h3>
        <p className={balance < 0 ? `red` : balance > 0 ? `green` : ``}>
          {balance < 0
            ? `You owe ${name} ${Math.abs(balance)}€`
            : balance > 0
            ? `${name} owes you ${balance}€`
            : `You and ${name} are even`}
        </p>
        <button className="button">Select</button>
      </li>
    </div>
  );
}
