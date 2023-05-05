import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getLaunchById } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedLaunch, setSelectedLaunch } from '../../redux';
import { Box, Button, Typography } from '@mui/material';
import { selectedLaunchData } from '../../redux/selectors/launch';
import Loader from '../Loader';

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedLaunch = useSelector(selectedLaunchData);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getLaunchById(id);

      dispatch(setSelectedLaunch(data));

      setIsLoading(false);
    })();
  }, []);

  const handleBackButton = () => {
    navigate(-1);

    dispatch(clearSelectedLaunch());

    setIsLoading(true);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Box
        style={{
          display: 'flex',
          width: '50%',
          margin: '40px auto',
          alignItems: 'center'
        }}>
        <img
          src={selectedLaunch.image}
          alt={`${selectedLaunch.rocket.configuration.name} image`}
          style={{
            width: '300px',
            height: '200px',
            marginRight: '10%'
          }}
        />
        <Box>
          <Typography>
            <b>Name:</b> {selectedLaunch.rocket.configuration.name}
          </Typography>
          <Typography>
            <b>Description:</b> {selectedLaunch.rocket.configuration.description}
          </Typography>
          <Typography>
            <b>Manufacturer:</b> {selectedLaunch.rocket.configuration.manufacturer.name}
          </Typography>
          <Typography>
            <b>Mission Name:</b> {selectedLaunch.mission.name}
          </Typography>
          <Typography>
            <b>Mission Description:</b> {selectedLaunch.mission.description}
          </Typography>
        </Box>
      </Box>
      <Button size="large" style={{ fontSize: '20px' }} onClick={handleBackButton}>
        Go back
      </Button>
    </>
  );
};

export default DetailPage;
