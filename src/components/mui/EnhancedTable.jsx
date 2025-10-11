import * as React from 'react';
import { useNavigate } from "react-router-dom";
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
import { API_URL } from "../../api.js"; // adjust path if needed





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
    { id: 'class', numeric: true, disablePadding: false, label: 'Class' },
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


function EnhancedTableToolbar({ numSelected, onDeleteSelected }) {
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
        <Tooltip title="Delete Selected">
          <IconButton onClick={onDeleteSelected} sx={{ color: 'red' }}>
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
  const [orderBy, setOrderBy] = React.useState('class');
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

    fetch(`${API_URL}/api/get_users`, {
      signal,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
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


  // this is to delete multiply code

  const handleDeleteSelected = async () => {
    if (selected.length === 0) return;

    if (!window.confirm(`Delete ${selected.length} selected record(s)?`)) return;

    try {
      // Get the actual rows for selected names
      const selectedRows = rows.filter((r) => selected.includes(r.name));
      const ids = selectedRows.map((r) => r.id);

      // Send to backend
      const response = await fetch(`${API_URL}/api/delete_multiple_users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids }), // ✅ send all selected IDs
      });

      const data = await response.json();

      if (data.status === "success") {
        // ✅ Remove deleted rows from UI
        setRows((prev) => prev.filter((r) => !ids.includes(r.id)));
        setSelected([]); // clear selection
        alert("Selected records deleted successfully!");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error("Delete multiple error:", err);
      alert("Failed to delete selected records. Check console.");
    }
  };



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

  const navigate = useNavigate();

  // --- Edit / Delete handlers ---
  const handleEdit = (row) => {
    navigate(`/admin/register/${row.id}?role=${(row.role)}`);

    // navigate(`/admin/register/${row.id}`);
    // go up one segment to /admin then to /admin/register/:id
  };

  // const handleEdit = (row) => {
  //   console.log('Edit clicked row:', row);
  // };


  const handleDelete = async (row) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      const response = await fetch(`${API_URL}/api/delete_user`, {
        method: "POST", // ✅ PHP reads body via POST (even if DELETE method is allowed)
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
      });

      const data = await response.json();


      if (data.status === "success") {
        setRows((prev) => prev.filter((r) => r.id !== row.id));
        // also update selected if needed
        setSelected((prev) => prev.filter((n) => n !== row.name));
        /*        }
              if (data.status === "success") {
                alert("Record deleted successfully!");
                // ✅ Remove deleted item from UI
                setRows((prev) => prev.filter((row) => row.id !== id)); */
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete record. Check console.");
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <EnhancedTableToolbar
          numSelected={selected.length}
          onDeleteSelected={handleDeleteSelected}
        />

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

            <TableBody >
              {loading ? (
                <TableRow >
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
                      key={`row-${row.id}-${row.name}`}
                      selected={isItemSelected}
                      className='table_row'
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
                        <IconButton onClick={(e) => { e.stopPropagation(); handleDelete(row); }} title="Delete" sx={{ color: 'red' }}>
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
    </Box >
  );
}
