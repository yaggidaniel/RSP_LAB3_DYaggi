// endpoint para la comunicación con la API
const endpoint = 'http://localhost/RSP1_Lab_3_Daniel-Yaggi/VehiculosAereoTerrestre.php';

// Elementos del contenedor de carga y del contenedor de datos del formulario
const loaderContainer = document.getElementById('loaderContainer');
const listaForm = document.getElementById('form-data-container');

// Array para almacenar los datos de los vehículos
let vehicle = [];


const $ = (id) => document.getElementById(id);


// Crear campos de entrada
const createInputField = (name, type) => {
  console.log("Creando el contenedor");
  const inputField = document.createElement("div");
  inputField.id = "input-field";

  // Creando la etiqueta para el campo de entrada
  const label = document.createElement("label");
  label.textContent = `${name}:`;
  label.setAttribute("for", `input-${name}`);

  // Creando el elemento de entrada
  const input = document.createElement("input");
  input.placeholder = `Ingrese ${name}`;
  input.type = type;
  input.id = `input-${name}`;
  input.required = true;

  // Agregando la etiqueta y el campo de entrada al contenedor
  inputField.appendChild(label);
  inputField.appendChild(input);

  return inputField;
};

// Función para crear dinámicamente un checkbox
const createCheckboxField = (input) => {
  // Creando el contenedor de la checkbox utilizando createInputField
  const checkboxContainer = createInputField(input.name, "checkbox");
  checkboxContainer.id = `chk-container-${input.id}`;
  checkboxContainer.className = "chk-container";

  // Obteniendo el elemento de entrada y la etiqueta del contenedor
  const inputElement = checkboxContainer.querySelector("input");
  const labelElement = checkboxContainer.querySelector("label");

  // Modificando atributos del elemento de entrada
  inputElement.removeAttribute("required");
  inputElement.setAttribute("checked", "true");
  inputElement.id = `chk-${input.id}`;
  labelElement.setAttribute("for", inputElement.id);

  return checkboxContainer;
};

// Función para agregar checkbox al formulario según el tipo seleccionado
const addCheckboxs = () => {
  const checkboxFields = $("ckl-colums-to-show");
  checkboxFields.innerHTML = "";

  // Obteniendo el tipo seleccionado del filtro
  const typeField = $("ddl-type-filter");
  const selectedValue = typeField.value;

  // Combinando diferentes conjuntos de campos según el tipo seleccionado
  const selectedInputs =
    selectedValue === "vehiculo"
      ? [...inputsDefault, ...inputsAir, ...inputsLand]
      : selectedValue === "aereo"
      ? [...inputsDefault, ...inputsAir]
      : [...inputsDefault, ...inputsLand];

  // Creando y agregando checkbox al formulario
  selectedInputs.forEach((input) => {
    const checkboxContainer = createCheckboxField(input);
    checkboxFields.appendChild(checkboxContainer);
  });
};

// Función para manejar el cambio en las checkbox
const onChangeCheckbox = () => {
  const checkboxesContainer = $("ckl-colums-to-show");

  // Seleccionando todas las checkbox en el contenedor
  const checkboxDivs = checkboxesContainer.querySelectorAll(
    "div[id^='chk-container']"
  );

  // Iterando sobre cada checkbox
  checkboxDivs.forEach((checkboxDiv) => {
    const inputElement = checkboxDiv.querySelector("input");
    const id = inputElement.id;
    const cellClass = `cell-${id.replace("chk-", "")}`;
    const headerId = `header-${id.replace("chk-", "")}`;

    const checkbox = $(id);

    // Agregando un evento de cambio a cada checkbox
    checkbox.addEventListener("change", () => {
      const cellElements = document.querySelectorAll(`#${cellClass}`);
      cellElements.forEach((element) => {
        element.style.display = checkbox.checked ? "table-cell" : "none";
      });

      const header = document.getElementById(headerId);
      header.style.display = checkbox.checked ? "table-cell" : "none";
    });
  });
};

// Función para ocultar checkbox según el tipo seleccionado
const hideCheckboxsByType = () => {
  const typeField = $("ddl-type-filter");
  const value = typeField.value;
  const columnsToHide =
    value === "terrestre"
      ? [...inputsAir]
      : value === "aereo"
      ? [...inputsLand]
      : [];

  // Obteniendo los IDs de las checkbox a ocultar
  const idsToHide = columnsToHide.map((column) => `chk-container-${column.id}`);
  changeDisplayElements(idsToHide, "none");
};

// Función para cambiar la visualización de elementos según su ID y valor de visualización
const changeDisplayElements = (element, display) => {
  element.forEach((id) => {
    const elements = document.querySelectorAll(`#${id}`);
    elements.forEach((element) => {
      element.style.display = display;
    });
  });
};

// Función para mostrar checkbox según el tipo seleccionado
const showCheckboxsByType = () => {
  const typeField = $("ddl-type-filter");
  const value = typeField.value;
  const columnsToShow =
    value === "terrestre"
      ? inputsLand
      : value === "aereo"
      ? inputsAir
      : [...inputsLand, ...inputsAir];

  // Obteniendo los IDs de las checkbox a mostrar
  const idsToShow = columnsToShow.map((column) => `chk-container-${column.id}`);
  changeDisplayElements(idsToShow, "flex");
};

// Función para ocultar columnas según el tipo seleccionado
const hideColumnsByType = () => {
  const typeField = $("ddl-type-filter");
  const value = typeField.value;

  const columnsToHide =
    value === "terrestre"
      ? [...inputsAir]
      : value === "aereo"
      ? [...inputsLand]
      : [];

  // Obteniendo los IDs de las columnas a ocultar
  const idsToHide = [
    ...columnsToHide.map((column) => `cell-${column.id}`),
    ...columnsToHide.map((column) => `header-${column.id}`),
  ];
  changeDisplayElements(idsToHide, "none");
};

// Función para mostrar columnas según el tipo seleccionado
const showColumnsByType = () => {
  // Obtiene el campo de tipo seleccionado
  const typeField = $("ddl-type-filter");
  const value = typeField.value;

  // Determina qué columnas mostrar según el tipo seleccionado
  const columnsToShow =
    value === "terrestre"
      ? [...inputsLand]
      : value === "aereo"
      ? [...inputsAir]
      : [...inputsLand, ...inputsAir];

  // Genera un array de IDs de elementos a ocultar
  const idsToHide = [
    ...columnsToShow.map((column) => `cell-${column.id}`),
    ...columnsToShow.map((column) => `header-${column.id}`),
  ];

  // Cambia la visibilidad de los elementos según el array de IDs
  changeDisplayElements(idsToHide, "table-cell");
};


// Controla el filtro
const onChangeFilterType = (value) => {
  console.log("onChangeFilterType pincha");
  // Oculta y muestra los checkbox según el tipo seleccionado
  hideCheckboxsByType();
  showCheckboxsByType();

  // Oculta y muestra las columnas según el tipo seleccionado
  hideColumnsByType();
  showColumnsByType();

  // Actualiza la tabla de datos filtrando por el tipo seleccionado

  uploadDataTable(filterByTypeData(value));
};

// Obtener información sobre los encabezados seleccionados a través de checkboxes
const heardersToShow = () => {
  const checkboxesContainer = $("ckl-colums-to-show");
  const checkboxInfoArray = [];

  const checkboxDivs = checkboxesContainer.querySelectorAll(
    "div[id^='chk-container']"
  );

  checkboxDivs.forEach((checkboxDiv) => {
    const inputElement = checkboxDiv.querySelector("input");
    const labelElement = checkboxDiv.querySelector("label");

    const id = inputElement.id.replace("chk-", "");
    const name = labelElement.textContent.replace(":", "");
    checkboxInfoArray.push({ id, name });
  });

  return checkboxInfoArray;
};

// Agrega dinámicamente las columnas al encabezado de la tabla según los encabezados seleccionados
const addTable = () => {
  const headers = $("header");
  headers.innerHTML = "";

  // Obtiene los encabezados seleccionados
  const selectedInputs = heardersToShow();

  // Agrega cada encabezado al encabezado de la tabla
  selectedInputs.forEach((hearder) => {
    const th = document.createElement("th");
    th.id = `header-${hearder.id}`;
    th.textContent = hearder.name;
    headers.appendChild(th);
  });

  // Agrega la columna de "Modificar" al encabezado
  const thModify = document.createElement("th");
  thModify.textContent = "Modificar";
  headers.appendChild(thModify);

  // Agrega la columna de "Eliminar" al encabezado
  const thDelete = document.createElement("th");
  thDelete.textContent = "Eliminar";
  headers.appendChild(thDelete);
};

const funcionEliminar = async (id) => {
  console.log('vehicle', vehicle)
  const vehicleToDelete = vehicle.find(
    (vehicle) => vehicle.id.toString() === id.toString()
  );
  const response = await callServiceFetchAsync(vehicleToDelete, 'DELETE');

  if (response === 'Exito') {
    vehicle = vehicle.filter(
      (vehicle) => vehicle.id.toString() !== id.toString()
    );
    uploadDataTable(vehicle);
  }
};


const funcionEditar = (id) => {
  const vehicleToEdit = vehicle.find(
    (vehicle) => vehicle.id.toString() === id.toString()
  );
  activateAbmForm(true);
  createFormAbm(vehicleToEdit);
};

// Crea una fila de la tabla con datos de un elemento
const createRow = (item) => {
  const tr = document.createElement("tr");
  const selectedInputs = [...inputsDefault, ...inputsAir, ...inputsLand];

  // Agrega cada celda a la fila
  selectedInputs.forEach((header) => {
    const td = document.createElement("td");
    td.id = `cell-${header.id}`;
    td.textContent = item[header.id];
    tr.appendChild(td);
  });

  // Agrega botón "Modificar" a cada fila
  const tdEdit = document.createElement("td");
  const btnEdit = document.createElement("button");
  btnEdit.textContent = "Modificar";
  btnEdit.id = item.id;
  btnEdit.addEventListener("click", (e) => funcionEditar(e.target.id));
  tdEdit.appendChild(btnEdit);
  tr.appendChild(tdEdit);

  // Agrega botón "Eliminar" a cada fila
  const tdDelete = document.createElement("td");
  const btnDelete = document.createElement("button");
  btnDelete.textContent = "Eliminar";
  btnDelete.id = item.id;
  btnDelete.addEventListener("click", (e) => funcionEliminar(e.target.id));
  tdDelete.appendChild(btnDelete);
  tr.appendChild(tdDelete);

  return tr;
};

// Actualiza la tabla con los datos proporcionados
const uploadDataTable = (data) => {
  console.log('data uploadDataTable', data);
  const tbody = $("table-body");
  tbody.innerHTML = "";
  // Agrega cada fila a la tabla
  data.forEach((item) => {
    tbody.appendChild(createRow(item));
  });
  // Oculta y muestra las columnas según el tipo seleccionado
  hideColumnsByType();
  showColumnsByType();
};


// Activa o desactiva el formulario de ABM y muestra los botones correspondientes según el modo de edición
const activateAbmForm = (editMode) => {
  const dataForm = $("form-data-container");
  const ambForm = $("form-amb-container");
  dataForm.style.display = "none";
  ambForm.style.display = "flex";

  const editButtons = $("btns-container-edit-delete");
  const addButtons = $("btns-container-add");

  // Configura la visibilidad de los botones según el modo de edición
  if (editMode) {
    editButtons.style.display = "flex";
    addButtons.style.display = "none";
  } else {
    addButtons.style.display = "flex";
    editButtons.style.display = "none";
  }
};

// Maneja el evento de doble clic en la tabla, abre el formulario de edición con los datos de la fila seleccionada
const onDoubleClickOnTable = () => {
  const table = $("data-table");

  table.addEventListener("dblclick", (e) => {
    const row = e.target.closest("tr");
    if (row) {
      e.preventDefault();
      const cellIdElement = row.querySelector("td[id='cell-id']");

      if (cellIdElement) {
        const id = cellIdElement.textContent;
        const personToEdit = vehicle.find(
          (person) => person.id.toString() === id
        );
        activateAbmForm(true);
        createFormAbm(personToEdit);
      }
    }
  });
};

// Genera un ID único basado en la marca de tiempo actual y deshabilita el campo correspondiente
const generateIdAndDisableField = () => {
  const idField = document.querySelector("#input-id");
  idField.value = new Date().getTime();
  idField.disabled = true;
};

// Agrega campos de entrada predeterminados al formulario
const addInputByDefault = (initialValues) => {
  const inputsContainer = $("default-inputs-container");
  inputsContainer.innerHTML = "";

  inputsDefault.forEach((input) => {
    const inputContainer = createInputField(input.name, input.type);
    const inputElement = inputContainer.querySelector("input");
    inputElement.id = `input-${input.id}`;
    inputElement.value = initialValues ? initialValues[input.id] : "";

    if (input.id === "id") {
      inputElement.disabled = true;
    }

    if (input.type === "number") {
      inputElement.setAttribute("min", input.min);
    }

    inputsContainer.appendChild(inputContainer);
  });

  if (initialValues !== undefined) {
    const selectTypeOfPerson = $("dll-type-person");
    selectTypeOfPerson.value =
      initialValues instanceof Aereo ? "aereo" : "terrestre";
    selectTypeOfPerson.disabled = true;
  } else {
    generateIdAndDisableField();
  }
};

// Agrega campos de entrada dinámicos al formulario según el tipo de persona seleccionado
const addInputByTypeData = (initialValues) => {
  const inputsContainer = $("dynamic-inputs-container");
  inputsContainer.innerHTML = "";

  const typeField = $("dll-type-person");
  const selectedInputs = typeField.value === "Aereo" ? inputsAir : inputsLand;

  selectedInputs.map((input) => {
    const inputContainer = createInputField(input.name, input.type);
    const inputElement = inputContainer.querySelector("input");
    inputElement.id = `input-${input.id}`;
    inputElement.value = initialValues ? initialValues[input.id] : "";
    if (input.type === "number") {
      inputElement.setAttribute("min", input.min);
    }
    inputsContainer.appendChild(inputContainer);
  });
};

// Crea un formulario de ABM con valores iniciales dados
const createFormAbm = (initialValues) => {
  addInputByDefault(initialValues);
  addInputByTypeData(initialValues);
};

// Convierte los datos del formulario a un objeto
const getlistaFormAsObject = (listaForm) => {
  const data = listaForm.querySelectorAll("input");
  const dataArray = Array.from(data).map((value) => ({
    [value.id.replace("input-", "")]: value.value,
  }));

  return dataArray.reduce((acc, value) => ({ ...acc, ...value }), {});
};

// Edita una persona en la lista y actualiza la tabla
const editPerson = async (listaForm) => {
  const personEdited = getlistaFormAsObject(listaForm);

  const personId = parseInt(personEdited.id);
  const personToUpdate = vehicle.find(
    (person) => person.id.toString() === personId.toString()
  );
  
   const response = await callServiceFetchAsync(personToUpdate, 'POST')
  console.log(response);
  if (personToUpdate && response === 'Exito') {
    personToUpdate.update(personEdited);
    uploadDataTable(vehicle);
  }
};

// Elimina una persona de la lista y actualiza la tabla
const deletePerson = (listaForm) => {
  const personEdited = getlistaFormAsObject(listaForm);
  console.log('personEdited', personEdited);

  const personId = parseInt(personEdited.id);
  funcionEliminar(personId);
};

// Agrega una persona a la lista y actualiza la tabla
const addPerson = (dataItem) => {
  const item = getlistaFormAsObject(dataItem);

  callServiceXHR(item, (response) => {
    console.log('response', response)
    loaderContainer.classList.add('hide');
    listaForm.classList.remove('hide');
    if (response?.id) {
      const personObject =
      "altMax" in item && "autonomia" in item
        ? new Aereo(
            item.id,
            item.modelo,
            item.anoFab,
            item.velMax,
            item.altMax,
            item.autonomia
          )
        : new Terrestre(
            item.id,
            item.modelo,
            item.anoFab,
            item.velMax,
            item.cantPue,
            item.cantRue
          );
  
      vehicle.push(personObject);
      uploadDataTable(vehicle);
    }
  })

};

// Maneja el envío del formulario de ABM
const handleAbmFormSubmit = (e) => {
  console.log("entre a handlebm");
  e.preventDefault();
  const clickedButton = document.querySelector('button[type="submit"]:focus');
  const buttonId = clickedButton.id;

  // Realiza la acción correspondiente según el botón presionado
  switch (buttonId) {
    case "btn-add":
      addPerson(e.target);
      break;
    case "btn-edit":
      editPerson(e.target);
      break;
    case "btn-delete":
      deletePerson(e.target);
      break;
  }

  // Oculta el formulario de ABM
  hideAbmForm();
  e.stopPropagation();
};

// Oculta el formulario de ABM y muestra el formulario de datos
const hideAbmForm = () => {
  const abmForm = $("form-amb-container");
  const dataForm = $("form-data-container");

  abmForm.style.display = "none";
  dataForm.style.display = "flex";
};

// Maneja el envío del formulario de datos
const handleDataFormSubmit = (e) => {
  e.preventDefault();

  // Desactiva el formulario de ABM y crea un nuevo formulario
  activateAbmForm(false);
  createFormAbm();
};


// Inicializa el documento cuando se carga completamente
const initializeDocument = () => {

  console.log(vehicle);
  // Llamada a la función para obtener datos de la API
  if((!vehicle || vehicle.length === 0)){
    fetchData();
  }

  // Resto del código de inicialización
  addCheckboxs();
  addTable();
  onDoubleClickOnTable();

  // Manejar cambios en el campo de filtro de tipo
  const typeField = $("ddl-type-filter");
  typeField.addEventListener("change", (e) => {    
    onChangeFilterType(e.target.value);
    console.log(e.target.value);
    console.log("Tipo de filtro seleccionado:", e.target.value);

  });

  const abmForm = $("form-amb-container");
  abmForm.addEventListener("submit", (e) => handleAbmFormSubmit(e));

  const btnCancel = $("btn-cancel");
  btnCancel.addEventListener("click", () => hideAbmForm());

  onChangeCheckbox();
};



// Función para obtener datos de la API
const fetchData = () => {
  // Realiza una solicitud fetch al endpoint con el método GET 
  console.log("Iniciando solicitud fetch...");
  return fetch(endpoint, {
    method: "GET",
    credentials: 'same-origin'  
  })
  .then(response => {
    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      console.error("Error al obtener datos desde la API");
      alert("Error al obtener datos desde la API");
      throw new Error("Error en la solicitud fetch");
    }
    console.log("Respuesta exitosa. Convirtiendo a JSON...");
    return response.json();
  })
  .then(data => {
    console.log("Datos obtenidos:", data);
    handleApiResponse(data);

    // Ocultar el cargador y mostrar el formulario después de 6 segundos
    setTimeout(() => {
      loaderContainer.classList.add('hide');
      listaForm.classList.remove('hide');
      document.body.style.overflow = 'visible';
      console.log("Cargador oculto, formulario mostrado.");
    }, 0);
  })
  .catch(error => {
    // Manejar errores de la solicitud
    console.error("Error en la solicitud fetch:", error);
    alert("Error en la solicitud fetch");
  });
};

// Mostrar el cargador inicialmente y bloquear la pantalla
listaForm.classList.add('hide');
loaderContainer.classList.remove('hide');
document.body.style.overflow = 'hidden';
console.log("Mostrando cargador, bloqueando pantalla...");

// Maneja la respuesta de la API y actualiza la lista y la tabla
const handleApiResponse = (response) => {
  console.log("Manejando respuesta de la API");

  vehicle = response.map((item) => {
    return "altMax" in item && "autonomia" in item
      ? new Aereo(
          item.id,
          item.modelo,
          item.anoFab,
          item.velMax,
          item.altMax,
          item.autonomia
        )
      : new Terrestre(
          item.id,
          item.modelo,
          item.anoFab,
          item.velMax,
          item.cantPue,
          item.cantRue
        );
  });

  // Actualizar la lista
  uploadDataTable(vehicle);
  console.log("Lista actualizada:", vehicle);
};


initializeDocument();

const botonAgregar = $('btn-go-abm');
botonAgregar.addEventListener('click', () => {
  createFormAbm();
  activateAbmForm();
})

async function callServiceFetchAsync(body, method) {
  try {
      listaForm.classList.add('hide');
      loaderContainer.classList.remove('hide');
      console.log(body.toJson());
      const response = await fetch(endpoint, {
        method,
        credentials: 'same-origin',
        body: JSON.stringify(body.toJson()), 
        headers: {
          'Content-Type': 'application/json',
      }
      });
      if (!response.ok) {
          loaderContainer.classList.add('hide');
          listaForm.classList.remove('hide');
          throw new Error('Error en la solicitud al endpoint');

      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      loaderContainer.classList.add('hide');
      listaForm.classList.remove('hide');
      return response.text();
  } catch (error) {
      throw error;
  }
}

const callServiceXHR = (body, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", endpoint, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  listaForm.classList.add('hide');
  loaderContainer.classList.remove('hide');

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Respuesta exitosa
      callback(JSON.parse(xhr.responseText))
    }
  };
  xhr.send(JSON.stringify(body));
}
