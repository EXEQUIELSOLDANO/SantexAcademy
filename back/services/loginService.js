const jwt = require("jsonwebtoken");
// const admin = require('../models');
// eslint-disable-next-line import/no-extraneous-dependencies
const sgMail = require("@sendgrid/mail");
const passwordService = require("./passwordService");
// const adminService = require('./adminSerivice');
const db = require("../models");

// Función para enviar mail
function enviarEmail(pass, email) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const textMail = `Tu contraseña es: ${pass}`;
  const msg = {
    to: email,
    from: "leo.vm.cba@gmail.com", // Use the email address or domain you verified above
    subject: "Contraseña Turisticapp",
    text: textMail,
    // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  // ES6
  sgMail.send(msg).then(
    () => {},
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
}

async function emailLogin(email) {
  const [admin, pollster] = await Promise.all([
    db.admin.findOne({
      where: {
        email,
      },
    }),
    db.pollster.findOne({
      where: {
        email,
      },
    }),
  ]);

  const user = admin || pollster;

  if (!user) {
    throw new Error("El email no existe");
  }

  // Llamar función generadora de OTP
  const pwd = passwordService.generarOtp();

  // Llamar al método que genera limite de tiempo de uso del OTP
  // eslint-disable-next-line camelcase
  const limit_time = passwordService.limiTime();
  const passCreate = await passwordService.createPassword(pwd, limit_time);
  user.password_id = passCreate.id;
  await user.save();
  //console.log('passCreate', passCreate);
  //console.log('pass', passCreate.id);
  //console.log('admin', admin);

  // Confirmar variable de control
  // eslint-disable-next-line prefer-const
  const existeAdmin = !!admin;
  enviarEmail(passCreate.password, user.email);

  return { existeAdmin };
}

// Función para verificar password

async function verificarPassword(pwd) {
  const pass = await db.password.findOne({
    where: {
      password: pwd,
    },
  });

  if (!pass) {
    throw new Error("La contraseña es incorrecta");
  } else {
    //Buscar la pwd en admin y pollster
    const [admin, pollster] = await Promise.all([
      db.admin.findOne({
        where: {
          password_id: pass.id,
        },
      }),
      db.pollster.findOne({
        where: {
          password_id: pass.id,
        },
      }),
    ]);

    let existeAdmin;

    // Verificar si la coincidencia se encuentra en admin o pollster
    if (admin) {
      existeAdmin = true;
      console.log("Existe Admin:", existeAdmin);
      console.log("Admin", !!admin);
      const token = jwt.sign(
        {
          id: admin.id,
          email: admin.email,
          name: admin.firstnamename,
          is_admin: existeAdmin,
        },
        "ClaveUltraSecreta"
      );
      return {
        accessToken: token,
      };
    } else if (pollster) {
      existeAdmin = false;
      console.log("Existe Admin:", existeAdmin);
      console.log("Polls", !!pollster);
      const token = jwt.sign(
        {
          id: pollster.id,
          email: pollster.email,
          name: pollster.firstname,
          is_admin: existeAdmin,
        },
        "ClaveUltraSecreta"
      );
      return {
        accessToken: token,
      };
    } else {
      //throw new Error("La contraseña no está asociada a ningún usuario.");
      return "La contraseña no está asociada a ningún usuario.";
    }
  }
}

// Con el id de password buscamos en la tabla de admin el password_id
// SELECT roll, password_id FROM admins a WHERE id = 1

module.exports = {
  emailLogin,
  verificarPassword,
};
