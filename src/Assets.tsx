import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid } from '@mui/material';

import useFetch from './useFetch';

interface IAssetCard {
  name: string;
  image: string;
  tokenId: string;
  contract: string;
}
function AssetCard({ name, image, tokenId, contract }: IAssetCard) {
  return (
    <Grid item xs={6} sm={3}>
      <Link to={`/asset/${tokenId}/${contract}`}>
        <Box
          sx={{
            height: `100%`,
            border: `1px solid black`,
            p: 2,
            '&:hover': { cursor: `pointer` },
          }}
        >
          <Box
            sx={{
              width: `100%`,
              height: 230,
              background: `center / cover  no-repeat url(${image})`,
            }}
          />
          <div>{name || `Default Name`}</div>
        </Box>
      </Link>
    </Grid>
  );
}

function Assets(): JSX.Element {
  const [url, setUrl] = useState(
    `https://api.opensea.io/api/v1/assets?owner=0x19818f44faf5a217f619aff0fd487cb2a55cca65&limit=20`,
  );
  const [assets, setAssets] = useState([]);
  const [next, setNext] = useState<string | null>(null);
  const { data, isLoading } = useFetch<{
    assets: [];
    next: string | null;
  }>(url);

  useEffect(() => {
    if (data) {
      setAssets((prev) => [...prev, ...data.assets]);
      setNext(data.next);
    }
  }, [data]);

  useEffect(() => {
    const scrollListener = () => {
      const height = document.querySelector(`body`)?.offsetHeight;
      if (next && window.scrollY + window.innerHeight === height) {
        setUrl(
          `https://api.opensea.io/api/v1/assets?owner=0x19818f44faf5a217f619aff0fd487cb2a55cca65&limit=20&cursor=${next}`,
        );
      }
    };
    window.addEventListener(`scroll`, scrollListener);
    return () => window.removeEventListener(`scroll`, scrollListener);
  }, [next]);

  return (
    <Box>
      <Grid container spacing={2}>
        {assets.map(
          ({
            id,
            name,
            image_url: imageUrl,
            token_id: tokenId,
            asset_contract: assetContract,
          }) => (
            <AssetCard
              key={id}
              name={name}
              image={imageUrl}
              tokenId={tokenId}
              contract={assetContract ? assetContract.address : ``}
            />
          ),
        )}
      </Grid>
      {isLoading ? <Box p={2}>Loading...</Box> : null}
    </Box>
  );
}

export default Assets;
