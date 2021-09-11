import React from "react";
import Qualities from "./qualities";
import BookMark from "./bookmark";

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  onDelete,
  ...rest
}) => {
  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>
        {qualities.map((qualitie) => (
          <Qualities {...qualitie} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}</td>
      <td>{<BookMark id={_id} {...rest} />}</td>
      <td>
        <button
          onClick={() => {
            onDelete(_id);
          }}
          className="btn btn-danger btn-sm"
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default User;
