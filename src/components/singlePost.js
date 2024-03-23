import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Button, Box } from "@material-ui/core";
import useLogin from "../stores/loginStore";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Alert from "@mui/material/Alert";

function SinglePost() {
  const { petId } = useParams();
  const [pet, setPet] = useState([]);
  const [buttonText, setButtonText] = useState("Request adoption");
  const [buttonDisable, setButtonDisable] = useState(false);
  let access_token = localStorage.getItem("access_token");
  const loginState = useLogin((state) => state.loggedIn);
  // console.log(access_token);
  let userId;
  if (access_token !== null) {
    userId = jwtDecode(access_token)?.user_id;
    // console.log(userId);
  }

  const initialFormData = Object.freeze({
    pet_experience: "",
    house_condition: "",
  });
  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post(`applications/`, {
        pet: petId,
        pet_experience: formData.pet_experience,
        house_condition: formData.house_condition,
      })
      .then((res) => {
        setButtonText("request submitted");
        setButtonDisable(true);
        // console.log(formData);
      })
      .catch((e) => console.error(e.message));
  };

  useEffect(() => {
    axiosInstance
      .get(`pets/${petId}`)
      .then((res) => {
        const singlePet = res.data;
        setPet(singlePet);
        // console.log(res.data);
      })
      .catch((e) => {
        console.error(e.message);
      });

    axiosInstance
      .get("applications")
      .then((res) => {
        const applications = res.data;
        const matchedApplication = applications.filter(
          (application) =>
            application.user === userId && application.pet === petId
        );
        if (matchedApplication.length !== 0) {
          setButtonText("request submitted");
          setButtonDisable(true);
        }
      })
      .catch((e) => console.error(e.message));
  }, [petId, userId, setPet]);

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Box
        component="img"
        sx={{
          height: 300,
          width: 350,
          maxHeight: { xs: 300, md: 250 },
          maxWidth: { xs: 400, md: 300 },
        }}
        alt="pet for adoption"
        src={pet.image}
      />

      <Box p={3}>
        <Typography gutterBottom variant="h3" component="h2">
          {pet.name}
        </Typography>
        {/* <Typography gutterBottom variant="h6" component="h6">
          species: {pet.species}
        </Typography>
        <Typography gutterBottom variant="h6" component="h6">
          breed: {pet.breed}
        </Typography> */}
        <h4>species: {pet.species}</h4>
        <h4>breed: {pet.breed}</h4>
        <h4>breed: {pet.breed}</h4>
        <h4>age: {pet.age}</h4>
        <h4>gender: {pet.gender}</h4>
        <h4>size: {pet.size}</h4>
        <h4>color: {pet.color}</h4>
        <p>description: {pet.description}</p>
        {loginState && !buttonDisable && (
          <form noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="pet_experience"
              label="Do you have any experience with pets?"
              name="pet_experience"
              // autoComplete="email"
              // autoFocus
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="house_condition"
              label="Which steps did you take to make your house suitable for pets?"
              type="house_condition"
              id="house_condition"
              autoComplete="house_condition"
              onChange={handleChange}
            />
            {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Sign In
          </Button> */}
            <Button
              // disabled={buttonDisable}
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              style={{ marginTop: "8px" }}
            >
              {buttonText}
            </Button>
          </form>
        )}
        {loginState && buttonDisable && (
          <Alert variant="filled" severity="success">
            you have already requested to adopt this pet
          </Alert>
        )}
      </Box>
    </Box>
  );
}

export default SinglePost;
