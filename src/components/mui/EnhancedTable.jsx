// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { alpha } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import './EnhancedTable.css';

// // Sorting helpers
// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// // Table head component
// function EnhancedTableHead(props) {
//   const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   const headCells = [
//     { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
//     { id: 'class', numeric: true, disablePadding: false, label: 'Class' },
//     { id: 'age', numeric: true, disablePadding: false, label: 'Age' },
//     { id: 'dob', numeric: true, disablePadding: false, label: 'Date of Birth' },
//     { id: 'address', numeric: true, disablePadding: false, label: 'Address' },
//     { id: 'action', numeric: true, disablePadding: false, label: 'Action' },
//   ];

//   return (
//     <TableHead >
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//           />
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? 'right' : 'left'}
//             padding={headCell.disablePadding ? 'none' : 'normal'}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : 'asc'}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   numSelected: PropTypes.number.isRequired,
//   rowCount: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
// };

// // Toolbar
// function EnhancedTableToolbar(props) {
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
//           Users Table
//         </Typography>
//       )}

//       {numSelected > 0 ? (
//         <Tooltip style={{ display: 'flex' }}>
//           <IconButton title="Delete" style={{ color: 'red' }}>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

// // Sample data
// // function createData(name, Class, age, dob, address, action) {
// //   return { name, Class, age, dob, address, action };
// // }

// // const rows = [
// //   createData('Joseph Baiyekusi', 'Jss 1', 14, '01/10/2006', 'No 22, Akande Street, Kaduna Road, Suleja, Niger State', <div className='editIcon_style'><EditIcon className='edit_icon' /></div>),
// //   createData('Paul James', 'Jss 1', 13, '04/10/2006', 'No 22, Akande Street, Kaduna Road, Suleja, Niger State', <div className='editIcon_style'><EditIcon className='edit_icon' /></div>),
// //   createData('Suleman Abdul', 'Jss 1', 14, '21/10/2006', 'No 22, Akande Street, Kaduna Road, Suleja, Niger State', <div className='editIcon_style'><EditIcon className='edit_icon' /></div>),
// //   createData('Ayomide Christian', 'Jss 1', 12, '05/10/2006', 'No 22, Akande Street, Kaduna Road, Suleja, Niger State', <div className='editIcon_style'><EditIcon className='edit_icon' /></div>),
// //   createData('Chinonso Imoniti', 'Jss 1', 14, '01/6/2006', 'No 22, Akande Street, Kaduna Road, Suleja, Niger State', <div className='editIcon_style'><EditIcon className='edit_icon' /></div>),
// //   createData('Benjamin Ramond', 'Jss 1', 15, '11/11/2006', 'No 22, Akande Street, Kaduna Road, Suleja, Niger State', <div className='editIcon_style'><EditIcon className='edit_icon' /></div>),
// //   createData('Joseph Baiyekusi', 'Jss 1', 14, '01/10/2006', 'No 22, Akande Street, Kaduna Road, Suleja, Niger State', <div className='editIcon_style'><EditIcon className='edit_icon' /></div>),
// //   createData('Paul James', 'Jss 1', 13, '04/10/2006', 'No 22, Akande Street, Kaduna Road, Suleja, Niger State', <div className='editIcon_style'><EditIcon className='edit_icon' /></div>),
// // ];

// // createData('Joseph Baiyekusi', 'Jss 1', 14, '01/10/2006', 'No 22, Akande Street, Kaduna Road, Suleja, Niger State', <div className='editIcon_style'><EditIcon className='edit_icon' /></div>),


// export default function SortingSelectingTable() {
//   const [order, setOrder] = React.useState('asc');
//   const [orderBy, setOrderBy] = React.useState('Class');
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };


//   // Rows will come from the server
//   const [rows, setRows] = React.useState([]);
//   const [loading, setLoading] = React.useState(true);
//   const [error, setError] = React.useState(null);


//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = rows.map((n) => n.name);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, name) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }

//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const isSelected = (name) => selected.indexOf(name) !== -1;

//   const visibleRows = stableSort(rows, getComparator(order, orderBy))
//     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Paper sx={{ width: '100%' }}>
//         <EnhancedTableToolbar numSelected={selected.length} />
//         <TableContainer>
//           <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
//             <EnhancedTableHead
//               numSelected={selected.length}
//               order={order}
//               orderBy={orderBy}
//               onSelectAllClick={handleSelectAllClick}
//               onRequestSort={handleRequestSort}
//               rowCount={rows.length}
//             />

//             <TableBody>
//               {visibleRows.map((row, index) => {
//                 const isItemSelected = isSelected(row.name);
//                 const labelId = `enhanced-table-checkbox-${index}`;

//                 return (
//                   <TableRow
//                     hover
//                     onClick={(event) => handleClick(event, row.name)}
//                     role="checkbox"
//                     aria-checked={isItemSelected}
//                     tabIndex={-1}
//                     key={`${row.name}-${index}`} // ✅ Unique key
//                     selected={isItemSelected}
//                   >
//                     <TableCell padding="checkbox">
//                       <Checkbox color="primary" checked={isItemSelected} />
//                     </TableCell>
//                     <TableCell component="th" id={labelId} scope="row" padding="none">
//                       {row.name}
//                     </TableCell>
//                     <TableCell align="right">{row.Class}</TableCell>
//                     <TableCell align="right">{row.age}</TableCell>
//                     <TableCell align="right">{row.dob}</TableCell>
//                     <TableCell align="right">{row.address}</TableCell>
//                     <TableCell align="right">{row.action}</TableCell>
//                   </TableRow>
//                 );
//               })}

//               {/* 👇 Placeholder rows to keep consistent height */}
//               {visibleRows.length < rowsPerPage &&
//                 [...Array(rowsPerPage - visibleRows.length)].map((_, index) => (
//                   <TableRow key={`empty-${index}`} style={{ height: 53 }}>
//                     <TableCell colSpan={7} />
//                   </TableRow>
//                 ))}
//             </TableBody>


//           </Table>

//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </Box>
//   );
// }
































import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import './EnhancedTable.css';

// --- Sorting helpers (unchanged) ---
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// --- Table head component (unchanged, but kept here) ---
function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'Class', numeric: true, disablePadding: false, label: 'Class' },
    { id: 'age', numeric: true, disablePadding: false, label: 'Age' },
    { id: 'dob', numeric: true, disablePadding: false, label: 'Date of Birth' },
    { id: 'address', numeric: true, disablePadding: false, label: 'Address' },
    { id: 'action', numeric: true, disablePadding: false, label: 'Action' },
  ];


  // createData('Joseph Baiyekusi', 'Jss 1', 14, '01/10/2006', 'No 22, Akande Street, Kaduna Road, Suleja, Niger State', <div className='editIcon_style'><EditIcon className='edit_icon' /></div>),

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  numSelected: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

// --- Toolbar (unchanged) ---
function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Users Table
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip style={{ display: 'flex' }}>
          {/* <IconButton onClick={(e) => { e.stopPropagation(); handleDeleteRow(); }} title="Delete" sx={{ color: 'red' }}> */}
          <IconButton title="Delete" style={{ color: 'red' }}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (


        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

// --- The enhanced table component (fetches data from an API) ---
export default function SortingSelectingTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('Class');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Rows will come from the server
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Fetch rows from your API endpoint on mount
  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    setError(null);

    fetch('http://localhost/CBT-MATH-PROJECT/backend/get_users.php', {
      signal,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Map server data to what the table expects
        /*    const mapped = (data || []).map((r, idx) => ({
             id: r.id ?? idx,
             name: r.username ?? '',
             Class: r.class ?? '',
             age: r.age !== undefined ? Number(r.age) : '',
             dob: r.dob ?? '',
             address: r.address ?? '',
           })); */

        setRows([...data]);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error('Fetch error:', err);
          setError(String(err.message || err));
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Keep the same stableSort + pagination logic but use rows from state
  const visibleRows = stableSort(rows, getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // --- Edit / Delete handlers ---
  const handleEdit = (row) => {
    // stopPropagation is used where this handler is invoked to avoid selecting the row
    console.log('Edit row', row);
    // open a modal or navigate to an edit page with row.id
  };

  const handleDeleteRow = async (row) => {
    if (!window.confirm(`Delete ${row.name}?`)) return;
    try {
      // Example delete call - update URL & method as your backend expects
      const res = await fetch(`http://localhost/CBT-MATH-PROJECT/backend/delete_user.php?id=${row.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Delete failed ${res.status}`);
      // remove from local state
      setRows((prev) => prev.filter((r) => r.id !== row.id));
      // also update selected if needed
      setSelected((prev) => prev.filter((n) => n !== row.name));
    } catch (err) {
      alert('Delete failed: ' + String(err));
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7}>Loading...</TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={7}>Error: {error}</TableCell>
                </TableRow>
              ) : (
                visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id ?? `${row.name}-${index}`}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox color="primary" checked={isItemSelected} />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.class}</TableCell>
                      <TableCell align="right">{row.age}</TableCell>
                      <TableCell align="right">{row.dob}</TableCell>
                      <TableCell align="right">{row.address}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={(e) => { e.stopPropagation(); handleEdit(row); }} title="Edit">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={(e) => { e.stopPropagation(); handleDeleteRow(row); }} title="Delete" sx={{ color: 'red' }}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>



          </Table>

        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}


/* ---------------------------------------------------------------------------
   Example PHP backend for XAMPP (put this file in htdocs/api/get_users.php)
   ---------------------------------------------------------------
   <?php
   header('Access-Control-Allow-Origin: *');
   header('Content-Type: application/json');

   $host = '127.0.0.1';
   $db   = 'your_database';
   $user = 'root';
   $pass = '';

   try {
       $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass, [
           PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
       ]);

       $stmt = $pdo->query('SELECT id, name, class, age, dob, address FROM users');
       $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
       echo json_encode($rows);
   } catch (Exception $e) {
       http_response_code(500);
       echo json_encode(['error' => $e->getMessage()]);
   }
   ?>

   Notes:
   - If your React app is served from a different origin/port, make sure CORS is configured.
   - For large datasets, implement server-side pagination: accept ?page=1&pageSize=10 and use LIMIT/OFFSET.
----------------------------------------------------------------------------*/
