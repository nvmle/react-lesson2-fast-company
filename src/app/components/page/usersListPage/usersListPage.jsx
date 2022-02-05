import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { useLocation } from "react-router";
import query from "query-string";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import { useUsers } from "../../../hooks/useUsers";
import { useProfession } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const UsersListPage = () => {
  const { isLoading: professionsLoading, professions } = useProfession();
  const { currentUser } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [searchData, setSearchData] = useState("");

  const location = useLocation();
  const pageSize = 8;

  const search = query.parse(location.search);

  if (!location.search) {
    search.sortBy = "name";
    search.order = "asc";
  }

  const [sortBy, setSortBy] = useState({
    path: search.sortBy,
    order: search.order
  });

  const { users } = useUsers();

  const handleDelete = (userId) => {
    // setUsers(
    //   users.filter((user) => {
    //     return user._id !== userId;
    //   })
    // );
    console.log(userId);
  };

  const handleToggleBookMark = (userId) => {
    const newArray = users.map((user) => {
      if (user._id === userId) {
        user.bookmark = !user.bookmark;
      }
      return user;
    });

    // setUsers(newArray);
    console.log(newArray);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchData]);

  const handleProfessionSelect = (item) => {
    setSearchData("");
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleChangeSearch = (e) => {
    setSelectedProf(undefined);
    setSearchData(e.target.value);
  };

  function filterUsers() {
    const filteredUsers = searchData
      ? users.filter((user) => user.name.toLowerCase().includes(searchData))
      : selectedProf
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : users;

    return filteredUsers.filter((u) => u._id !== currentUser._id);
  }

  const filteredUsers = filterUsers();

  const count = Array.isArray(filteredUsers) && filteredUsers.length;
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
  const usersCrop = paginate(sortedUsers, currentPage, pageSize);

  const clearFilter = () => {
    setSelectedProf();
  };

  if (users) {
    return (
      <div className="d-flex">
        {professions && !professionsLoading && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionSelect}
            />
            <button onClick={clearFilter} className="btn btn-secondary mt-2">
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count} />
          <input
            type="text"
            className="w-100 mx-auto"
            name="searchData"
            value={searchData}
            onChange={handleChangeSearch}
            placeholder="Search..."
          ></input>

          {count > 0 && (
            <UsersTable
              users={usersCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
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
  }
  return "Loading...";
};
UsersListPage.propTypes = {
  users: PropTypes.array
};

export default UsersListPage;
