import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
  Avatar,
} from "@material-ui/core";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./utils";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import numeral from "numeral";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Drawer from "./Drawer";
import Epass from "./Epass";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const [countries, setcountries] = useState([]);
  const [country, setcountry] = useState("worldwide");
  const [countryinfo, setcountryinfo] = useState({});
  const [tableData, settableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        dispatch(
          login({
            photo: authuser.photoURL,
            email: authuser.email,
            displayName: authuser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((respose) => respose.json())
      .then((data) => {
        setcountryinfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((respose) => respose.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);

          settableData(sortedData);
          setMapCountries(data);
          setcountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setcountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setcountry(countryCode);
        setcountryinfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <Router>
          <Switch>
            <Route path="/epass">
              <Epass />
            </Route>
            {/* <Route path="/symptoms">
              <Symptoms />
            </Route> */}
            <Route path="/">
              <Drawer />
              <div className="app__left">
                <div className="app__header">
                  <h1>COVID-19 TRACKER</h1>
                  <FormControl className="app__dropdown">
                    <Select
                      variant="outlined"
                      onChange={onCountryChange}
                      value={country}
                    >
                      <MenuItem value="worldwide">Worldwide</MenuItem>
                      {countries.map((country) => (
                        <MenuItem value={country.value}>
                          {country.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="app__stats">
                  <InfoBox
                    onClick={(e) => setCasesType("cases")}
                    title="Coronavirus Cases"
                    isRed
                    active={casesType === "cases"}
                    cases={prettyPrintStat(countryinfo.todayCases)}
                    total={numeral(countryinfo.cases).format("0.0a")}
                  />
                  <InfoBox
                    onClick={(e) => setCasesType("recovered")}
                    title="Recoverd"
                    active={casesType === "recovered"}
                    cases={prettyPrintStat(countryinfo.todayRecovered)}
                    total={numeral(countryinfo.recovered).format("0.0a")}
                  />
                  <InfoBox
                    onClick={(e) => setCasesType("deaths")}
                    title="Deaths"
                    isRed
                    active={casesType === "deaths"}
                    cases={prettyPrintStat(countryinfo.todayDeaths)}
                    total={numeral(countryinfo.deaths).format("0.0a")}
                  />
                </div>
                <Map
                  casesType={casesType}
                  countries={mapCountries}
                  center={mapCenter}
                  zoom={mapZoom}
                />
              </div>
              <Card className="app__right">
                <CardContent>
                  <Avatar
                    className="app__avatar"
                    onClick={() => auth.signOut()}
                    src={user?.photo}
                  />{" "}
                  <p>{user?.displayName}</p>
                  <h3>Lives Cases by Country</h3>
                  <Table countries={tableData} />
                  <h3 className="app__graphTitle">
                    {" "}
                    Worldwide New {casesType}
                  </h3>
                  <LineGraph className="app__graph" casesType={casesType} />
                </CardContent>
              </Card>
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
