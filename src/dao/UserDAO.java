package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

import beans.User;
import enums.Gender;
import enums.Role;

public class UserDAO {
	private Map<String, User> users = new HashMap<>();

	public UserDAO() {
	}

	public UserDAO(String contextPath) {
		loadUsers(contextPath);
	}

	public User find(String username, String password) {
		if (!users.containsKey(username)) {
			return null;
		}
		User user = users.get(username);
		if (!user.getPassword().equals(password)) {
			return null;
		}
		return user;
	}

	public boolean add(User user) {
		if (users.containsKey(user.getUsername())) {
			return false;
		}

		users.put(user.getUsername(), user);
		return true;
	}

	public void save(User user) {
		users.remove(user.getUsername());
		users.put(user.getUsername(), user);
	}

	public Collection<User> findAll() {
		return users.values();
	}

	private void loadUsers(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/users.txt");
			in = new BufferedReader(new FileReader(file));
			String line;
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					String firstName = st.nextToken().trim();
					String lastName = st.nextToken().trim();
					String username = st.nextToken().trim();
					String password = st.nextToken().trim();
					String gender = st.nextToken().trim();
					String role = st.nextToken().trim();
					users.put(username, new User(username, password, firstName, lastName, gender, role));
				}
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (Exception e) {
				}
			}
		}
	}

	public boolean saveUsers(String contextPath) {
		try {
			File f = new File(contextPath + "users.txt");
			f.delete();
			PrintWriter out = new PrintWriter(contextPath + "users.txt");

			for (User u : users.values()) {
				String s = u.getFirstName();
				s += ";";
				s += u.getLastName();
				s += ";";
				s += u.getUsername();
				s += ";";
				s += u.getPassword();
				s += ";";

				if (u.getGender() == Gender.MALE) {
					s += "Male";
				} else if (u.getGender() == Gender.FEMALE) {
					s += "Female";
				} else {
					s += "Unknown";
				}
				s += ";";

				if (u.getRole() == Role.ADMINISTRATOR) {
					s += "Administrator";
				} else if (u.getRole() == Role.HOST) {
					s += "Host";
				} else {
					s += "Guest";
				}

				out.println(s);
			}

			out.close();

			return true;
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			return false;
		}
	}

}