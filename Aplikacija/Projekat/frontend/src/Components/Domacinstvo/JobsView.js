import React, { useState, useEffect } from "react";
import JobsCardForDomacinstvo from "./JobsCardForDomacinstvo";
import DeleteJobsModal from "./DeleteJobsModal";
import AddNewJobsCard from "./AddNewJobsCard";
import { useHistory } from "react-router-dom";
import AddJobsModal from "./AddJobsModal";
import UpdateJobsModal from "./UpdateJobsModal";
import classes from "./JobsView.module.css";

const JobsView = () => {
  const [jobs, setJobs] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAddNew, setOpenAddNew] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [job, setJob] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

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
    setJob(jobs.find((el) => el.ID == ID));
    setOpenUpdate(true);
    console.log(job);
  };

  const onClickAddHandelr = () => {
    setOpenAddNew(true);
  };

  const fetchJobsHandler = async () => {
    const ID = localStorage.getItem("DomacinstvoID");
    console.log(ID);
    const response = await fetch(
      "https://localhost:5001/Posao/PreuzetiPosloveZaDomacinstvo/" + ID
    );
    const data = await response.json();
    console.log(data);
    const transformedDataJobs = data.map(function (prod) {
      return {
        ID: prod.id,
        BrojRadnihMesta: prod.brojRadnihMesta,
        Datum: prod.datum,
        Opis: prod.opis,
        Cena: prod.cena,
      };
    });
    setJobs(transformedDataJobs);
    setIsLoaded(true);
  };

  const onClickAddNewJobsHandler = async (
    brRadnihMesta,
    datumPocetka,
    opis,
    cena
  ) => {
    const ID = localStorage.getItem("DomacinstvoID");
    const response = await fetch(
      "https://localhost:5001/Domacinstvo/DodatiPosao/" +
        ID +
        "/" +
        brRadnihMesta +
        "/" +
        datumPocetka +
        "/" +
        opis +
        "/" +
        cena,
      { method: "POST" }
    );
    setOpenAddNew(false);
    fetchJobsHandler();
  };

  const onDeleteHandler = async () => {
    const ID = localStorage.getItem("DomacinstvoID");
    const response = await fetch(
      "https://localhost:5001/Domacinstvo/IzbrisiPosao/" + ID + "/" + job.ID,
      {
        method: "DELETE",
      }
    );
    setOpenDelete(false);
    fetchJobsHandler();
  };

  const onClickSaveChangeHandler = async (
    brRadnihMesta,
    datumPocetka,
    opis,
    cena
  ) => {
    const ID = localStorage.getItem("DomacinstvoID");
    const response = await fetch(
      "https://localhost:5001/Domacinstvo/IzmeniPosao/" +
        ID +
        "/" +
        job.ID +
        "/" +
        brRadnihMesta +
        "/" +
        datumPocetka +
        "/" +
        opis +
        "/" +
        cena,
      { method: "PUT" }
    );
    setOpenUpdate(false);
    fetchJobsHandler();
    window.location.reload(false);
  };

  const onClickDeleteHandler = (ID) => {
    setJob(jobs.find((el) => el.ID == ID));
    setOpenDelete(true);
  };

  useEffect(() => {
    fetchJobsHandler();
  }, []);
  if (!isLoaded) {
    return <div className={classes.Loading}>Loading...</div>;
  }
  return (
    <div>
      <div className={classes.allProducts}>
        {jobs.map((prod) => (
          <JobsCardForDomacinstvo
            className={classes.Product}
            opis={prod.Opis}
            brojRadnihMesta={prod.BrojRadnihMesta}
            cena={prod.Cena}
            datum={prod.Datum}
            onClickUpdate={() => onClickUpdateHandler(prod.ID)}
            onClickDelete={() => onClickDeleteHandler(prod.ID)}
          />
        ))}
        <AddNewJobsCard
          className={classes.Product}
          onClickAdd={onClickAddHandelr}
        />
      </div>
      <div>
        {openDelete && (
          <DeleteJobsModal
            show={openDelete}
            onClose={handleCloseDelete}
            onDelete={onDeleteHandler}
          />
        )}
      </div>
      <div>
        {openAddNew && (
          <AddJobsModal
            show={openAddNew}
            onClose={handleCloseAdd}
            onClickAddNewProduct={onClickAddNewJobsHandler}
          />
        )}
      </div>
      <div>
        {openUpdate && (
          <UpdateJobsModal
            show={openUpdate}
            onClose={handleCloseUpdate}
            opis={job.Opis}
            brRadnihMesta={job.BrojRadnihMesta}
            cena={job.Cena}
            datum={job.Datum}
            onClickSaveChange={onClickSaveChangeHandler}
          />
        )}
      </div>
    </div>
  );
};

export default JobsView;
