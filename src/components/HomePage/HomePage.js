import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, TableCell, TableRow } from '@mui/material';

import Table from '../Table';
import Loader from '../Loader';
import { getListOfLaunches } from '../../api';
import { launchData, setAllLaunches } from '../../redux';

const TABLE_HEADER = ['Name', 'Type of mission', 'Last updated', 'Window start', 'Window end', ''];

const HomePage = () => {
  const dispatch = useDispatch();
  const launch = useSelector(launchData);
  const navigate = useNavigate();

  const [entries, setEntries] = useState(10);
  const [lastPage, setLastPage] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getList = async () => {
    const data = await getListOfLaunches(entries, page * entries);

    dispatch(setAllLaunches(data.results));

    if (data.count <= entries) {
      setLastPage(1);
    } else {
      const lastPageIndex = Math.ceil(data.count / entries);
      setLastPage(lastPageIndex);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    (async () => await getList())();
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await getList();
    })();
  }, [page]);

  const handleOnEntriesChange = (entries) => {
    setPage(0);
    setEntries(entries);
  };

  const renderHeader = () => (
    <TableRow>
      {TABLE_HEADER.map((name) => (
        <TableCell align="center" key={name}>
          {name}
        </TableCell>
      ))}
    </TableRow>
  );

  const renderEmptyDataRow = () => (
    <TableRow>
      <TableCell colSpan={6} align="center">
        There are no results for launches.
      </TableCell>
    </TableRow>
  );

  const renderRows = (item) => (
    <TableRow key={item.id} hover tabIndex={0}>
      <TableCell>
        <Box display="flex" alignItems="center">
          {item.rocket.configuration.full_name}
        </Box>
      </TableCell>
      <TableCell>{item.mission?.type || ''}</TableCell>
      <TableCell>{format(parseISO(item.last_updated), 'MMM dd, yyyy')}</TableCell>
      <TableCell>{format(parseISO(item.window_start), 'MMM dd, yyyy')}</TableCell>
      <TableCell>{format(parseISO(item.window_end), 'MMM dd, yyyy')}</TableCell>
      <TableCell onClick={() => navigate(`/detail/${item.id}`)}>
        View more
        <ChevronRightIcon style={{ verticalAlign: 'middle', fontSize: '17px' }} />
      </TableCell>
    </TableRow>
  );

  if (isLoading) return <Loader />;

  return (
    <Table
      renderHeader={renderHeader}
      renderEmptyDataRow={renderEmptyDataRow}
      renderRows={renderRows}
      data={launch}
      entries={entries}
      lastPage={lastPage}
      page={page}
      onEntriesChange={handleOnEntriesChange}
      onPageChange={setPage}
    />
  );
};

export default HomePage;
