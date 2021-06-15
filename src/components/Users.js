import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initializeUsers } from "../reducers/usersReducer"
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core"

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.usersView)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

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
                  {user.username}
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