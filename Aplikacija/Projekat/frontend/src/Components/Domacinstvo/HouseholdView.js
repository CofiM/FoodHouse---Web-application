import React, { useState, useEffect } from "react";
import ProizvodCardForDomacinstvo from "./ProductCardForDomacinstvo";
import DeleteModal from "./DeleteModal";
import AddNewItemCard from "./AddNewItemCard";
import { useHistory } from "react-router-dom";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import classes from "./ChangeDomacinstvoProduct.module.css";
//LOCAL STORAGE NE RADI NE ZNAM ZASTO!!!!!!!!!

function HouseHoldView() {
  const ID = JSON.parse(localStorage.getItem("DomacinstvoID"));
  const [products, setProducts] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAddNew, setOpenAddNew] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [product, setProduct] = useState([]);
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleCloseAdd = () => {
    setOpenAddNew(false);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };
  const onClickUpdateHandler = (ID) => {
    setProduct(products.find((el) => el.ID == ID));
    console.log("USLO U UPDATE");
    setOpenUpdate(true);
  };
  const onClickAddHandelr = () => {
    setOpenAddNew(true);
  };
  const onDeleteHandler = async () => {
    const response = await fetch(
      "https://localhost:5001/Proizvod/ObrisatiProizvod/" + product.ID,
      {
        method: "DELETE",
      }
    );
    setOpenDelete(false);
    fetchProductHandler();
  };
  const onClickAddNewProductHandler = async (
    naziv,
    kolicina,
    cena,
    opis,
    kategorija
  ) => {
    const response = await fetch(
      "https://localhost:5001/Domacinstvo/DodatiProizvod/" +
        1 +
        "/" +
        naziv +
        "/" +
        kolicina +
        "/" +
        cena +
        "/" +
        opis +
        "/" +
        kategorija,
      { method: "POST" }
    );
    setOpenAddNew(false);
    fetchProductHandler();
  };
  const onClickSaveChangeHandler = async (
    naziv,
    kolicina,
    cena,
    opis,
    kategorija
  ) => {
    const response = await fetch(
      "https://localhost:5001/Proizvod/IzmeniProizvod/" +
        product.ID +
        "/" +
        naziv +
        "/" +
        kolicina +
        "/" +
        cena +
        "/" +
        opis +
        "/" +
        kategorija,
      { method: "PUT" }
    );
    setOpenUpdate(false);
    fetchProductHandler();
  };
  const onClickDeleteHandler = (ID) => {
    console.log("Uslo u delete");
    setProduct(products.find((el) => el.ID == ID));
    setOpenDelete(true);
  };
  const fetchProductHandler = async () => {
    console.log("uslo");
    const response = await fetch(
      "https://localhost:5001/Proizvod/PreuzetiProizvodeZaDomacinstvo/" + 1
    );
    const data = await response.json();
    console.log(data);
    let comments = [];
    const transformedDataProduct = data.map(function (prod) {
      let pros = 0;
      prod.recenzije.forEach((el) => {
        pros += el.ocena;
        comments.push(el.komentar);
      });
      console.log(comments);
      let kom = comments;
      comments = [];
      pros = pros / prod.recenzije.length;
      return {
        ID: prod.id,
        Cena: prod.cena,
        Kategorija: prod.kategorija,
        Kolicina: prod.kolicina,
        Naziv: prod.naziv,
        Opis: prod.opis,
        Ocena: pros,
        Komentari: kom,
      };
    });
    setProducts(transformedDataProduct);
  };
  useEffect(() => {
    fetchProductHandler();
  }, []);
  console.log(products);
  return (
    <div>
      <div className={classes.allProducts}>
        {products.map((prod) => (
          <ProizvodCardForDomacinstvo
            className={classes.Product}
            naziv={prod.Naziv}
            kolicina={prod.Kolicina}
            cena={prod.Cena}
            opis={prod.Opis}
            ocena={prod.Ocena}
            onClickUpdate={() => onClickUpdateHandler(prod.ID)}
            onClickDelete={() => onClickDeleteHandler(prod.ID)}
          />
        ))}
        <AddNewItemCard
          className={classes.Product}
          onClickAdd={onClickAddHandelr}
        />
      </div>
      <div>
        {openDelete && (
          <DeleteModal
            show={openDelete}
            onClose={handleCloseDelete}
            onDelete={onDeleteHandler}
          />
        )}
      </div>
      <div>
        {openAddNew && (
          <AddModal
            show={openAddNew}
            onClose={handleCloseAdd}
            onClickAddNewProduct={onClickAddNewProductHandler}
          />
        )}
      </div>
      <div>
        {openUpdate && (
          <UpdateModal
            show={openUpdate}
            onClose={handleCloseUpdate}
            naziv={product.Naziv}
            kolicina={product.Kolicina}
            cena={product.Cena}
            opis={product.Opis}
            kategorija={product.Kategorija}
            onClickSaveChange={onClickSaveChangeHandler}
          />
        )}
      </div>
    </div>
  );
}

export default HouseHoldView;
