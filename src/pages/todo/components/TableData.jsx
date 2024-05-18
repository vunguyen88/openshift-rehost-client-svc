import SoftBadge from "../../../components/SoftBadge";
import ActionCell from "../../../components/Table/ActionCell";
import moment from "moment";

const uncompleted = (
  <SoftBadge variant="contained" color="warning" size="xs" badgeContent="uncompleted" container sx={{ cursor: "pointer", lineHeight: 0 }}/>
);
const completed = (
  <SoftBadge variant="contained" color="success" size="xs" badgeContent="completed" container />
);

// const dataTableData = {
//   columns: [
//     {
//       Header: "todo",
//       accessor: "todo",
//       width: "40%",
//       Cell: ({ value: [name, data] }) => (
//         // <ProductCell name={name} checked={data.checked} />
//         <p>{name}</p>
//       ),
//     },
//     { Header: "created on", accessor: "createdOn" },
//     { Header: "target date", accessor: "targetDate" },
//     { Header: "set reminder", accessor: "setReminder" },
//     {
//       Header: "status",
//       accessor: "status",
//       // Cell: ({ value }) => (value === "in stock" ? inStock : outOfStock),
//       Cell: ({ value }) => (value === "completed" ? completed : uncompleted),
//     },
//     { Header: "action", accessor: "action" },
//   ],

//   rows: [
//     {
//       todo: ["Todo 1", { 
//         //image: adidasHoodie, 
//         checked: false 
//       }],
//       createdOn: "05/11/2024",
//       targetDate: "06/13/2024",
//       setReminder: "Yes",
//       status: "completed",
//       action: <ActionCell />,
//     },
//     {
//       todo: ["Todo 2", { 
//         //image: adidasHoodie, 
//         checked: false 
//       }],
//       createdOn: "05/32/2024",
//       targetDate: "06/16/2024",
//       setReminder: "No",
//       status: "uncompleted",
//       action: <ActionCell />,
//     },
//   ],
// };

const generateTodoData = (todoList=[]) => {
  let rows = todoList.map(todo => {
    let todoTitle = [todo.title, { checked: false}];
    let createdOn = moment(todo.created_at).format('MM-DD-YYYY');
    let targetDate = todo.target_date;
    let setReminder = todo.set_reminder && todo.set_reminder === true ? "Yes" : "No";
    let status = todo.completed === true ? 'completed' : 'unconpleted';
    let action = <ActionCell todoId={todo.id} completed={todo.completed}/>
    return ({
      todo: todoTitle, createdOn, targetDate, setReminder, status, action
    })
  })
  return({
    columns: [
      {
        Header: "todo",
        accessor: "todo",
        width: "35%",
        Cell: ({ value: [name, data] }) => (
          // <ProductCell name={name} checked={data.checked} />
          <p>{name}</p>
        ),
      },
      { Header: "created on", accessor: "createdOn" },
      { Header: "target date", accessor: "targetDate" },
      { Header: "set reminder", accessor: "setReminder" },
      {
        Header: "status",
        accessor: "status",
        // Cell: ({ value }) => (value === "in stock" ? inStock : outOfStock),
        Cell: ({ value }) => (value === "completed" ? completed : uncompleted),
      },
      { Header: "action", accessor: "action" },
    ],
  
    rows: rows
  })
};

export default generateTodoData;