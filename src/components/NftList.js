import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

export default function NftList({ data }) {
  return (
    <>
      <div>Total: {data.length}</div>
      <ImageList sx={{ width: 900, height: 490 }}>
        {data.map((item, index) => (
          <ImageListItem key={index}>
            <img src={item.img} alt={item.title} loading="lazy" />
            <ImageListItemBar
              title={item.title}
              subtitle={<span>Address: {item.address}</span>}
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}
