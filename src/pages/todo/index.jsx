// prop-types is a library for typechecking of props
import { useEffect, useState, useContext } from "react";

import axios from "axios";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Modal from '@mui/material/Modal';

// Soft UI Dashboard PRO React components
import SoftBox from "../../components/SoftBox/index";
import SoftButton from "../../components/SoftButton/index";
import SoftTypography from "../../components/SoftTypography/index";

// Soft UI Dashboard PRO React example components
import Navbar from "../../components/Navbar";
import PageLayout from "../../components/Layout/index";
import NewTodo from "./components/NewTodo";
import DataTable from "../../components/Table"
// Authentication layout components
// import Footer from "../../components/Footer";

// Data
import generateTodoData from "./components/TableData";
import AuthContext from "../../context/authContext";
import TodoContext from "../../context/todoContext";

function TodoPage() {

  const [openNewTodo, setNewTodoOpen] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const handleOpenNewTodo = () => setNewTodoOpen(true);
  const handleCloseNewTodo = () => setNewTodoOpen(false);
  const { auth, dispatch } = useContext(AuthContext);
  const { todos, todoDispatch } = useContext(TodoContext)

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        // if todo context > 0, stop the fetch request
        if (todos.length) return;
        // if no context data available due to refresh or first time enter, fetch data and update context
        let res = await axios.get('http://localhost:8001/todos', {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`
          }
        });
        if (res.status === 200 && res.data.status == "success") {
          setTodoList([...res.data.data])
          todoDispatch({type: 'FETCH_TODO', todoList: res.data.data})
        }
      } catch(e) {
        console.log('error ', e)
      }
    }

    fetchTodos()
  }, [])

  return (
    <PageLayout>
      <Navbar
        transparent
      />
      <SoftBox
        width="calc(100% - 2rem)"
        minHeight="25vh"
        borderRadius="lg"
        mx={2}
        my={2}
        pt={4}
      >
        <Grid container spacing={3} justifyContent="center" sx={{ textAlign: "center" }}>
          <Grid item xs={10} lg={4}>
            <SoftBox mt={6} mb={1}>
              <SoftTypography variant="h1" color="dark" fontWeight="bold">
                Your Todo List
              </SoftTypography>
            </SoftBox>
            <SoftBox mb={2}>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
      <SoftBox mt={{ xs: -10, lg: -10 }} px={1} width="calc(100% - 2rem)" mx="auto">
        <Card style={{ minHeight: "70vh"}}>
          <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <SoftBox lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                Todo List
              </SoftTypography>
              </SoftBox>
              <Stack spacing={1} direction="row">
                <SoftButton variant="gradient" color="info" size="small" onClick={handleOpenNewTodo}>
                  new todo
                </SoftButton>
                <Modal open={openNewTodo} onClose={handleCloseNewTodo} >
                  <div><NewTodo /></div>
                </Modal>
                {/* <SoftButton variant="outlined" color="info" size="small">
                    import
                </SoftButton>
                <SoftButton variant="outlined" color="info" size="small">
                    export
                </SoftButton> */}
              </Stack>
          </SoftBox>
            <DataTable
              table={todos ? generateTodoData(todos.todos) : generateTodoData(todoList)}
              entriesPerPage={{
              defaultValue: 7,
              entries: [5, 7, 10, 15, 20, 25],
              }}
              canSearch
            />
        </Card>
      </SoftBox>
      {/* <Footer /> */}
    </PageLayout>
  );
}

export default TodoPage;
