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

  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper} style={{ "width":800 }}>
        <Table>
          <TableBody>
            <TableRow>
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