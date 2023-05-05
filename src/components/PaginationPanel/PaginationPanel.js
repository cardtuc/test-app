import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';

const PaginationPanel = ({
  entries,
  onEntriesChange,
  rowsPerPageOptions,
  lastPage,
  page,
  onPageChange
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleOpen = () => setOpen(true);

  const handleChangeEntries = (event) => {
    onEntriesChange?.(Number(event.target.value));
  };

  const changePage = (_0, newPage) => {
    onPageChange?.(newPage - 1);
  };

  return (
    <Box p={2} justifyContent="end" display="flex" alignItems="center">
      <Box display="flex">
        <Box alignItems="center" display="flex" mr={1}>
          <Typography variant="body1" component="label">
            Rows per page:
          </Typography>
        </Box>
        {rowsPerPageOptions.length && (
          <Select
            variant="standard"
            disableUnderline
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={entries}
            renderValue={(value) => value}
            onChange={handleChangeEntries}>
            {rowsPerPageOptions.map((option) => (
              <MenuItem
                key={option}
                id={`rows-per-page-pagination-option-${option}`}
                value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        )}
      </Box>
      <Pagination
        showFirstButton
        showLastButton
        onChange={changePage}
        page={page + 1}
        count={lastPage}
        size="small"
      />
    </Box>
  );
};

PaginationPanel.propTypes = {
  entries: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onEntriesChange: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default PaginationPanel;
