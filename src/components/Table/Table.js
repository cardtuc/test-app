import { useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, TableBody, TableContainer, TableHead } from '@mui/material';

import PaginationPanel from '../PaginationPanel';

const Table = ({
  renderHeader,
  renderEmptyDataRow,
  renderRows,
  data,
  entries,
  onEntriesChange,
  lastPage,
  page,
  onPageChange
}) => {
  const tableRef = useRef(null);

  return (
    <Box>
      <TableContainer style={{ cursor: 'pointer' }} ref={tableRef}>
        <TableHead style={{ backgroundColor: 'lightblue' }}>{renderHeader()}</TableHead>
        <TableBody>
          {!data.length && !!renderEmptyDataRow ? renderEmptyDataRow() : data.map(renderRows)}
        </TableBody>
      </TableContainer>
      <PaginationPanel
        entries={entries}
        onEntriesChange={onEntriesChange}
        rowsPerPageOptions={[5, 10, 15, 25]}
        lastPage={lastPage}
        page={page}
        onPageChange={onPageChange}
      />
    </Box>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  onEntriesChange: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  renderHeader: PropTypes.func.isRequired,
  renderEmptyDataRow: PropTypes.func.isRequired,
  renderRows: PropTypes.func.isRequired,
  entries: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number)
};

export default Table;
