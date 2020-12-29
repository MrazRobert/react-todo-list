const List = ({items, removeItem}) => {
  return (
    <ul className="list-container">
      {items.map((item, index) => {
        const {id, content} = item;
        return (
          <li key={id} className="list-item">
            <p>{`${index + 1}. ${content}`}</p>
            <button className="btn list-btn" onClick={() => removeItem(id, "delete")}>X</button>
            <button className="btn list-btn" onClick={() => removeItem(id, "done")}>Done</button>
          </li>
        )
      })}
    </ul>
  );
}

export default List