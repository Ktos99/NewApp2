module.exports = function(req, res, next) {
    const { email, name, password, surname, passwordcheck } = req.body;
    
  
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    function validdPassword(userPassword) {
      return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(userPassword);
    }

    function validName(user_name) {
      return /^[A-Za-z]+$/.test(user_name);
    }

    function validLastName(user_lastname) {
      return /^[A-Za-z]+$/.test(user_lastname);
    }

  
    if (req.path === "/register" || req.path === "adduser") {
      if (![email, name, password, surname, passwordcheck].every(Boolean)) {
        return res.status(401).json("Wszystkie pola muszą być uzupełnione");
      } else if (name.length < 2 || name.length > 30) {
        return res.status(401).json("Imię musi zawierać od 2 do 30 znaków.");
      } else if (surname.length < 2 || surname.length > 30) {
        return res.status(401).json("Nazwisko musi zawierać od 2 do 30 znaków.");
      } else if (!validName(name)) {
        return res.status(401).json("Imię musi zaczynać się z dużej litery oraz nie może znaków specjalnych");
      }else if (!validLastName(surname)) {
        return res.status(401).json("Nazwisko musi zaczynać się z dużej litery oraz nie może znaków specjalnych");
      } else if (!validEmail(email)) {
        return res.status(401).json("Nieprawidłowy adres email");
      } else if (!validdPassword(password)) {
        return res.status(401).json("Hasło musi zawierać od 8 do 20 znaków, minimum jeden znak specjalny oraz dużą i małą literę");
      } else if (password != passwordcheck) {
        return res.status(401).json("Hasła muszą być identyczne!");
      
      }
    } else if (req.path === "/login") {
      if (![email, password].every(Boolean)) {
        return res.status(401).json("Wszystkie pola muszą być uzupełnione");
      } else if (!validEmail(email)) {
        return res.json("Nieprawidowy adres email");
      }
    }
  
    next();
  };