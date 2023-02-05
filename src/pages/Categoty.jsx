import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
function Categoty() {
  const params = useParams();
  
  return (
    <h1>
      Category {params.categoryName}
    </h1>
  )
}

export default Categoty
