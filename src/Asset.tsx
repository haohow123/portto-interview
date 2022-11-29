import React, { useState } from 'react';
import { Button, IconButton, Typography, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import useFetch from './useFetch';

function Asset(): JSX.Element {
  const { token, contract } = useParams();
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const { data, isLoading } = useFetch<Record<string, any>>(
    `https://api.opensea.io/api/v1/asset/${contract}/${token}`,
  );
  const {
    collection,
    image_url: imageUrl,
    name,
    description,
    permalink,
  } = data || {
    collection: { name: `` },
    permalink: ``,
  };
  if (isLoading) {
    return <Box>Loading...</Box>;
  }
  return (
    <Box
      sx={{
        textAlign: `center`,
        display: `flex`,
        flexDirection: `column`,
        justifyItems: `center`,
      }}
    >
      <Box sx={{ position: `relative` }}>
        <IconButton
          sx={{ position: `absolute`, left: 0, top: `32px` }}
          onClick={() => navigate(-1)}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h1" component="h1">
          {collection.name}
        </Typography>
      </Box>
      <Box>
        <img src={imageUrl} alt="asset" />
      </Box>
      <Typography variant="h6" component="div">
        {name}
      </Typography>
      <Typography
        variant="body1"
        component="p"
        sx={{
          ...(!showMore && {
            textOverflow: `ellipsis`,
            overflow: `hidden`,
            whiteSpace: `nowrap`,
          }),
        }}
      >
        {description}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: `blue`, cursor: `pointer` }}
        onClick={() => setShowMore(!showMore)}
      >
        show more
      </Typography>
      <Button target="_blank" href={permalink} variant="contained">
        Permalink
      </Button>
    </Box>
  );
}

export default Asset;
