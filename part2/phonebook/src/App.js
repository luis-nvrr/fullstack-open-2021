import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import PersonsList from "./PersonsList";
import personService from "./services/persons";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [results, setResults] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [notificationType, setNotificationType] = useState("")

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = (event) => {
    clearFilter();
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    let searched = event.target.value;
    setFilter(searched);
    filterPersons(searched);
  };

  const filterPersons = (searched) => {
    setResults(filterPersonsByName(searched));
  };

  const filterPersonsByName = (name) => {
    return persons.filter((person) =>
      person.name.toLowerCase().includes(name.toLowerCase())
    );
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    if (newName === "") {
      return alert("Not a valid name");
    }
    if (
      isNameRepeated(newName) &&
      window.confirm(
        `${newName} is already on the phonebook, replace the old number with a new one?`
      )
    ) {
      updatePerson();
      return;
    }
    createPerson();
    clearInput();

  };

  const createPerson = () => {
    const person = {
      name: newName,
      number: newNumber,
    };
    personService
      .create(person)
      .then((response) => setPersons(persons.concat(response.data)))
      .then(successfulCreationMessage());
  };

  const removePerson = (id) => () => {
    let removedPerson = findPersonById(id);
    if (
      window.confirm(`Are you sure you want to delete ${removedPerson.name}`)
    ) {
      personService
      .remove(id)
      .then(() => setPersons(persons.filter((person) => person.name !== removedPerson.name)))
      .then(successfulRemoveMessage(removedPerson.name))
      .catch(error => {
        unsuccessfulMessage(removedPerson.name)
        updateLocalMemory(id)
      });
    }
  };

  const findPersonById = (id) => {
    return persons.find((person) => person.id === id);
  };

  const updatePerson = () => {
    const oldPerson = findPersonByName(newName);
    const newPerson = {
      ...oldPerson,
      number: newNumber,
    };

    personService
      .update(newPerson.id, newPerson)
      .then((response) => setPersons(persons.map((person) =>
      person.name === response.data.name ? response.data : person)))
      .then(successfulUpdateMessage())
      .catch(error => {
        unsuccessfulMessage(newPerson.name)
        updateLocalMemory(newPerson.id)
      });
    clearInput();
  };

  const updateLocalMemory = (id) => {
    setPersons(persons.filter(person => person.id !== id))
  }

  const resetMessage = () => {
    setTimeout(() => setMessage(null), 5000);
  }

  const successfulCreationMessage = () => {
    setMessage(`New person added: ${newName}`);
    setNotificationType("success");
    resetMessage();
  }

  const successfulUpdateMessage = () => {
    setMessage(`Successfully updated ${newName}`);
    setNotificationType("success");
    resetMessage();
  }

  const successfulRemoveMessage = (name) => {
    setMessage(`Successfully removed ${name}`);
    setNotificationType("success");
    resetMessage();
  }

  const unsuccessfulMessage = (name) => {
    setMessage(`${name} has been already removed from the server`);
    setNotificationType("error");
    resetMessage();
  }

  const findPersonByName = (name) => {
    return persons.find(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    );
  };

  const clearInput = () => {
    setNewName("");
    setNewNumber("");
  };

  const clearFilter = () => {
    setFilter("");
    setResults([]);
  };

  const isNameRepeated = (name) => {
    if (persons.findIndex((person) => person.name === name) !== -1) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} notificationType={notificationType} />
      <Filter
        value={filter}
        onChange={handleFilterChange}
        onBlur={clearFilter}
      />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addNewPerson}
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <PersonsList
        personsArray={filter === "" ? persons : results}
        onDelete={removePerson}
      />
    </div>
  );
};

export default App;
