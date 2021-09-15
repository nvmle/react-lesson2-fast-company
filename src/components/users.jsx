import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";
import api from "../API";
import SearchStatus from "./searchStatus";

const Users = ({ users: allUsers, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const pageSize = 2;

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      // console.log(data);
      setProfessions(data);
    });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const filterUsers = () => {
    const newUsers = allUsers.filter((user) => {
      const userProfProps = Object.entries(user.profession);
      const selectedProfProps = Object.entries(selectedProf);
      let status = true;

      if (userProfProps.length === selectedProfProps.length) {
        for (let i = 0; i < userProfProps.length; i++) {
          const trustyKey = userProfProps[i][0] === selectedProfProps[i][0];
          const trustyValue = userProfProps[i][1] === selectedProfProps[i][1];
          status = status && trustyKey && trustyValue;
        }
      }
      return status ? user : null;
    });
    return newUsers;
  };

  const filteredUsers = selectedProf ? filterUsers() : allUsers;

  const count = Array.isArray(filteredUsers) && filteredUsers.length;
  const users = paginate(filteredUsers, currentPage, pageSize);

  const clearFilter = () => {
    setSelectedProf();
  };
  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            selectedItem={selectedProf}
            items={professions}
            onItemSelect={handleProfessionSelect}
          />
          <button onClick={clearFilter} className="btn btn-secondary mt-2">
            {" "}
            Очистить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <SearchStatus length={count} />
        {count > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return <User key={user._id} {...rest} {...user} />;
              })}
            </tbody>
          </table>
        )}
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};
Users.propTypes = {
  users: PropTypes.array
};

export default Users;
