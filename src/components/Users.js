import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core"

const Users = () => {
  const users = useSelector(state => state.usersView)


  const tableStyles =  {
    backgroundColor: "#c9cdf2",
    padding: "1rem 1.5rem 1.5rem",
    "width":800,
    "&:hover": {
      backgroundColor: "#aab0e0",
    }
  }


  return (
    <div>
      <h2 className="page-header">Users</h2>
      <TableContainer component={Paper} style={tableStyles} color="inherit ">
        <Table>
          <TableBody>
            <TableRow style={{ margin: 50 }}>
              <TableCell></TableCell>
              <TableCell style={{ "fontWeight": 800 }}>
                blogs created
              </TableCell>
            </TableRow>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell>
                  {user.blogs.length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users