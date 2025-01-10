import User from "../models/users.js";
import { Op } from "sequelize";
import nodemailer from "nodemailer";
import mjml2html from 'mjml'

async function generateID(id) {
	const { count } = await findAndCountAllUsersById(id);
	if (count > 0) {
		id = id.substring(0, 5);
		const { count } = await findAndCountAllUsersById(id);
		id = id + (count + 1);
	}
	return id;
}

export async function getUsers() {
	return await User.findAll();
}
export async function getUserById(id) {
	return await User.findByPk(id);
}
export async function findAndCountAllUsersById(id) {
	return await User.findAndCountAll({
		where: {
			id: {
				[Op.like]: `${id}%`,
			},
		},
	});
}
export async function findAndCountAllUsersByEmail(email) {
	return await User.findAndCountAll({
		where: {
			email: {
				[Op.eq]: email,
			},
		},
	});
}
export async function findAndCountAllUsersByUsername(username) {
	return await User.findAndCountAll({
		where: {
			username: {
				[Op.eq]: username,
			},
		},
	});
}
export async function registerUser(userDatas, bcrypt) {
	if (!userDatas) {
		return { error: "Aucune donnée à enregistrer" };
	}
	const { firstname, lastname, username, email, password } = userDatas;
	if (!firstname || !lastname || !username || !email || !password) {
		return { error: "Tous les champs sont obligatoires" };
	}
	//vérification que l'email n'est pas déjà utilisé
	const { count: emailCount } = await findAndCountAllUsersByEmail(email);
	if (emailCount > 0) {
		return { error: "L'adresse email est déjà utilisée." };
	}

	//vérification que le pseudo n'est pas déjà utilisé
	const { count: usernameCount } = await findAndCountAllUsersByUsername(
		username
	);
	if (usernameCount > 0) {
		return { error: "Le nom d'utilisateur est déjà utilisé." };
	}
	//création de l'identifiant
	let id = await generateID(
		(lastname.substring(0, 3) + firstname.substring(0, 3)).toUpperCase()
	);
	//hashage du mot de passe
	const hashedPassword = await bcrypt.hash(password);
	//création de l'utilisateur dans la base de données
	const user = {
		id,
		firstname,
		lastname,
		username,
		email,
		password: hashedPassword,
	};
	const createdUser = await User.create(user)

	const transporter = nodemailer.createTransport(
		{
			host: "127.0.0.1",
			port: 1025,
		}
	)
	const replacers = {
		link: {
			attributes: {href: 'http://localhost/5173/users/' + user.id + '/valdiate'}
		}
	}
	const htmlOutput = mjml2html(`
<mjml>
  <mj-head>
    <mj-title>Welcome to PokeBattle !</mj-title>
    <mj-font name="Roboto" href="https://fonts.googleapis.com/css?family=Roboto:300,500"></mj-font>
    <mj-attributes>
      <mj-all font-family="Roboto, Helvetica, sans-serif"></mj-all>
      <mj-text font-weight="300" font-size="16px" color="#616161" line-height="24px"></mj-text>
      <mj-section padding="0px"></mj-section>
    </mj-attributes>
  </mj-head>
  <mj-body>
    <mj-section padding="20px 0">
      <mj-column width="60%">
        <mj-text font-size="10px">Start creating your own pokemon teams right now !</mj-text>
      </mj-column>
      <mj-column width="40%">
        <mj-text align="right">locahost:5173</mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column width="100%">
        <mj-image href="" src="" alt="PokeBattle"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column width="100%">
        <mj-text align="center">Satisfy your Pokemon Battle passion !</mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column width="45%">
        <mj-text align="center" font-weight="500" padding="0px" font-size="18px">Welcome {{username}}</mj-text>
        <mj-divider border-width="2px" border-color="#616161"></mj-divider>
        <mj-divider border-width="2px" border-color="#616161" width="45%"></mj-divider>
      </mj-column>
    </mj-section>
    <mj-section padding-top="30px">
      <mj-column width="100%">
        <mj-text>
          <p>Hello there!</p>
          <p> Welcome to the world of Pokemon ! You joinded the PokeBattle league specialise into High Ranking Pokemon Battle, even harder than the classic Pokemon league ! </p>
          <p>But before we can let you join the PokeBattle league, we require you validate your email through the bellow link: <a href=""  mj-replace-id="link">Valider mon comtpe</a></p>
          <p>Once it's done, you may start to create your best Pokemon Teams and battle every dressors around the world !</p>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column width="11%">
        <mj-image padding-right="0px" padding-left="25px" align="left" width="70px" href="" src="" alt="Mew"></mj-image>
      </mj-column>
      <mj-column width="89%">
        <mj-text padding="0 25px">
          <p style="color:#BDBDBD; line-height: 9px"> Red - <a href="localhost:5173" style="color: #3498DB;">
              PokeBattle
            </a>  Champion </p>
          <p style="font-style: italic; color:#BDBDBD; line-height: 9px">Pikechu use lightning !</p>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column width="100%">
        <mj-divider border-width="1px" border-color="#E0E0E0"></mj-divider>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column width="75%">
        <mj-text>
          <h3 style="font-weight: bold; margin-top: 0; margin-bottom: 0"> <a href="localhost:5173" style="color: #3498DB; text-decoration: none">
              First pokemon gen is available !
            </a> </h3>
          <p style="font-size: 14px">We allow you to choose between 151 species of Pokemon to build up your team ! Next gen will be available soon !</p>
        </mj-text>
      </mj-column>
      <mj-column width="25%">
        <mj-image width="100px" href="" alt="Mew"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column width="75%">
        <mj-text>
          <h3 style="font-weight: bold; margin-top: 0; margin-bottom: 0"> <a href="localhost:5173" style="color: #3498DB; text-decoration: none;">
              Battle against your firends !
            </a> </h3>
          <p style="font-size: 14px;">With a matchmaking lobby, you may battle with your best friend or with anyon around the world !</p>
        </mj-text>
      </mj-column>
      <mj-column width="25%">
        <mj-image width="100px" href="" src="" alt="Mew"></mj-image>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
	`, {
		keepComments: false,
		minify: true
	});

	transporter.sendMail({
		from: 'pokebattle@yopmail.com',
		to: createdUser.email,
		subject: 'Validation du compte PokeBattle',
		html: htmlOutput.html
	})

	return createdUser;
}
export async function loginUser(userDatas, app) {
	if (!userDatas) {
		return { error: "Aucune donnée n'a été envoyée" };
	}
	const { email, password } = userDatas;
	if (!email || !password) {
		return { error: "Tous les champs sont obligatoires" };
	}
	//vérification que l'email est utilisé
	const { count, rows } = await findAndCountAllUsersByEmail(email);
	if (count === 0) {
		return {
			error: "Il n'y a pas d'utilisateur associé à cette adresse email.",
		};
	} else if (rows[0].verified === false) {
		return {
			error: "Votre compte n'est pas encore vérifié. Veuillez vérifier votre boîte mail.",
		};
	}
	//récupération de l'utilisateur
	const user = await User.findOne({
		where: {
			email: {
				[Op.eq]: email,
			},
		},
	});
	//comparaison des mots de passe
	const match = await app.bcrypt.compare(password, user.password);
	if (!match) {
		return { error: "Mot de passe incorrect" };
	}
	// Générer le JWT après une authentification réussie
	const token = app.jwt.sign(
		{ id: user.id, username: user.username },
		{ expiresIn: "3h" }
	);
	return { token: token, userId: user.id, username: user.username };
}
export async function validateEmail(id) {
	const user = await User.findByPk(id);
	if (!user) {
		return { error: "Utilisateur non trouvé"}
	}

	user.verified = true;
	await user.save()
	return {verified: user.verified};
}
