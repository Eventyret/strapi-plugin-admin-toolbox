# StrapiAdminToolbox (SAT)

Strapi Admin Toolbox (SAT) is a Strapi plugin that provides a set of tools to manage admin users. This plugin helps you generate fake admin users, delete all admin users except one, and restore a specific admin user. It also aims to include a UI for managing your admins, particularly useful if you get locked out.

## ✨ Features

- **Generate Fake Admin Users**: Create a specified number of fake admin users for testing purposes.

- **Delete All Admins Except the First**: Retain only the first admin user and delete all others.

- **Delete All Admins Except a Specific Email**: Keep one admin user based on their email address and delete the rest.

- **Restore Admin User**: Restore a specific admin user by email.

## 🚀 Installation

1. Install the plugin via npm:

```bash
npm install strapi-plugin-strapiadmintoolbox
```

2. Add the plugin configuration to your `config/plugins.js` or `config/plugins.ts` file:

`config/plugins.js|ts`

```javascript
module.exports = {
  ...rest of your plugins file.
  strapiadmintoolbox: {
    enabled: true,
    config: {
      generateFakeAdmins: {
        enabled: false,
        count: 50,
      },
      deleteExceptFirst: {
        enabled: false,
      },
      deleteExceptEmail: {
        enabled: false,
        email: process.env.ADMIN_EMAIL_TO_KEEP || "",
      },
      restoreAdmin: {
        enabled: false,
        email: process.env.ADMIN_EMAIL_TO_KEEP || "",
      },
    },
  },
};
```

3. Add the email to keep in your `.env` file:

```env
ADMIN_EMAIL_TO_KEEP=admin@example.com
```

## 🛠️ Usage

The plugin's tasks run automatically when you start your Strapi instance based on the configuration settings.

### Generate Fake Admin Users

To generate fake admin users, update the plugin configuration to enable this feature and set the desired count:

```javascript
generateFakeAdmins: {
enabled: true,
count: 50,
},
```

### Delete All Admins Except the First

To keep only the first admin user and delete all others, enable this feature in the configuration:

```javascript
deleteExceptFirst: {
enabled: true,
},
```

### Delete All Admins Except a Specific Email

To retain an admin user by email and delete all others, set the email in the configuration and enable the feature:

```javascript
deleteExceptEmail: {
enabled: true,
email: process.env.ADMIN_EMAIL_TO_KEEP ||  "",
},
```

### Restore Admin User

To restore a specific admin user by email, enable the feature and set the email in the configuration:

```javascript
restoreAdmin: {
enabled: true,
email: process.env.ADMIN_EMAIL_TO_KEEP ||  "",
},
```

## 🔮 Future Development

This plugin will include a user interface (UI) in future releases, allowing for easier management of admin users, especially useful in scenarios where you may be locked out.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## 📄 License

This project is licensed under the MIT License.
