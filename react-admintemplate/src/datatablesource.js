export const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
        field: 'a',
        headerName: 'First name',
        width: 150,
        editable: true,
      },
      {
        field: 'b',
        headerName: 'First name',
        width: 150,
        editable: true,
      },
  ];

  export const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35,a:"asa",b:"" },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 ,a:"asa",b:""},
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 ,a:"asa",b:""},
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 ,a:"asa",b:""},
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null,a:"asa",b:"" },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150,a:"asa",b:"" },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 ,a:"asa",b:""},
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 ,a:"asa",b:""},
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 ,a:"asa",b:""},
    { id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65 ,a:"asa",b:""},
    { id: 11, lastName: 'Roxie', firstName: 'Harvey', age: 65 ,a:"asa",b:""},
    { id: 12, lastName: 'Roxie', firstName: 'Harvey', age: 65 ,a:"asa",b:""},
    { id: 13, lastName: 'Roxie', firstName: 'Harvey', age: 65 ,a:"asa",b:""},
    { id: 14, lastName: 'Roxie', firstName: 'Harvey', age: 65 ,a:"asa",b:""},
    { id: 15, lastName: 'Roxie', firstName: 'Harvey', age: 65 ,a:"asa",b:""},
    { id: 16, lastName: 'Roxie', firstName: 'Harvey', age: 65 ,a:"asa",b:""},
    { id: 17, lastName: 'Roxie', firstName: 'Harvey', age: 65 ,a:"asa",b:""},
    { id: 18, lastName: 'Roxie', firstName: 'Harvey', age: 65 ,a:"asa",b:""},
    { id: 19, lastName: 'Roxie', firstName: 'Harvey', age: 65 ,a:"asa",b:""},
    { id: 20, lastName: 'Roxie', firstName: 'Harvey', age: 65 ,a:"asa",b:""},
    { id: 21, lastName: 'Roxie', firstName: 'Harvey', age: 65 ,a:"asa",b:""},
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 ,a:"asa",b:""},
    { id: 23, lastName: 'Roxie', firstName: 'Harvey', age: 65 ,a:"asa",b:""},
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 ,a:"asa",b:""},
    { id: 15, lastName: 'Roxie', firstName: 'Harvey', age: 65 ,a:"asa",b:""},
    
  ];

  
  export const Bookcolumns = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'title',
      headerName: 'Title',
      width: 150,
      editable: true,
    },
    {
        field: 'authors',
        headerName: 'Authors',
        width: 230,
        renderCell: (params) => (
          <div className="">
            {params.value?.map((author, index) => (
              <b key={index}>{author.name}, </b>
            ))}
          </div>
        ),
        type: 'string',
      },
  
    {
      field: 'language',
      headerName: 'Language',
      type: 'string',
      width: 110,
      editable: true,
    },
    {
        field: 'genres',
        headerName: 'Genres',
        width: 230,
        renderCell: (params) => (
          <div className="overflow-auto">
            {params.value?.map((genre, index) => (
              <b key={index}>{genre.name}, </b>
            ))}
          </div>
        ),
        type: 'string',
      },
  ];

  export const userColumns = [
    { field: "_id", headerName: "ID", width: 70 },
    {
      field: "username",
      headerName: "User",
      width: 230,
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
  
    {
      field: "role",
      headerName: "Role",
      width: 100,
    },
   
  
  ];
  

  export const bookNumberColumns = [
    {
      field: 'available',
      headerName: 'Available',
      width: 80,
    },
    {
      field: "ISBN",
      headerName: "Isbn no",
      width: 100,
    },

    {
      field: 'price',
      headerName: 'Price',
      width: 100,
    },
    {
      field: 'dueDate',
      headerName: 'DueDate',
      width: 110,
    },
   
  ];

  export const authorColumns=[
    {
      field: "_id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
  ]

  export const genreColumns=[
    {
      field: "_id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
  ]