import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import './Feed.css'
const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [groups, setGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState({
    isPublic: '',
    name: '',
    category: '',
    subCategory: '',
    level: '',
  });
  useEffect(() => {
    if(token) {
      fetch("/posts", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(async data => {
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
        setPosts(data.posts);
      })
    }
  }, [])
  useEffect(() => {
    if (token) {
      fetch("/groups", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        setGroups(data.groups);
      })
    }
  }, [token])
  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }
  const createGroup = () => {
    // Logic to handle creating a group and redirect to another page
    navigate('/create-group')
  }
  const handleSearch = () => {
    const filteredGroups = groups.filter(group =>
      (searchFilter.isPublic === '' || group.isPublic === searchFilter.isPublic) &&
      (searchFilter.name === '' || group.name.toLowerCase().includes(searchFilter.name.toLowerCase())) &&
      (searchFilter.category === '' || group.category.toLowerCase().includes(searchFilter.category.toLowerCase())) &&
      (searchFilter.subCategory === '' || group.subCategory.toLowerCase().includes(searchFilter.subCategory.toLowerCase())) &&
      (searchFilter.level === '' || group.level === searchFilter.level)
    );
    setGroups(filteredGroups);
  }
  if(token) {
    return(
      <>
        <h1>Homepage</h1>
        <div>
          <br></br>
          <button onClick={createGroup} style={{ fontSize: '18px', color: 'red' }}>Create a Study Group</button><br></br><br></br>
          <br></br><p>Search for a Study Group</p>
          <label>
            Public/Private:
            <select
              value={searchFilter.isPublic}
              onChange={(event) => setSearchFilter({ ...searchFilter, isPublic: event.target.value })}
            >
              <option value="">All</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </label>
          <br></br>
          <label>
            Name:
            <input
              type="text"
              value={searchFilter.name}
              onChange={(event) => setSearchFilter({ ...searchFilter, name: event.target.value })}
            />
          </label>
          <br></br>
          <label>
            Category:
            <input
              type="text"
              value={searchFilter.category}
              onChange={(event) => setSearchFilter({ ...searchFilter, category: event.target.value })}
            />
          </label>
          <br></br>
          <label>
            Sub-Category:
            <input
              type="text"
              value={searchFilter.subCategory}
              onChange={(event) => setSearchFilter({ ...searchFilter, subCategory: event.target.value })}
            />
          </label>
          <br></br>
          <label>
            Level:
            <input
              type="text"
              value={searchFilter.level}
              onChange={(event) => setSearchFilter({ ...searchFilter, level: event.target.value })}
            />
          </label>
          <br></br><br></br>
          <button onClick={handleSearch}>Search</button>
        </div>
        <div id='feed' role="feed">
          {groups.map((group) => (
            <div key={group._id}>{group.name}</div>
          ))}
          {posts.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </div>
        <br></br><button onClick={logout}>Logout</button>
      </>
    )
  } else {
    navigate('/signin')
    return null;
    // consider returning something if the user is not logged in??
  }
}
export default Feed;