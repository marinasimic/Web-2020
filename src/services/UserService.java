package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.fasterxml.jackson.databind.util.JSONPObject;

import beans.User;
import dao.UserDAO;

@Path("/users")
public class UserService {

	@Context
	ServletContext ctx;

	public UserService() {
	}

	@PostConstruct
	public void init() {
		if (ctx.getAttribute("userDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("userDAO", new UserDAO(contextPath));
		}
	}

	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response login(User user, @Context HttpServletRequest request) {
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		User loggedUser = userDao.find(user.getUsername(), user.getPassword());
		if (loggedUser == null) {
			return Response.status(400).entity("Invalid username and/or password").build();
		}
		request.getSession().setAttribute("user", loggedUser);
		return Response.status(200).build();
	}

	@POST
	@Path("/signup")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response signup(User user, @Context HttpServletRequest request) {
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		if (!userDao.add(user)) {
			return Response.status(400).entity("Username already exists!").build();
		}

		if (!userDao.saveUsers(ctx.getRealPath(""))) {
			return Response.status(400).entity("User wasn't saved!").build();
		}

		return Response.status(200).build();
	}

	@POST
	@Path("/logout")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void logout(@Context HttpServletRequest request) {
		request.getSession().invalidate();
	}

	@GET
	@Path("/currentUser")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User login(@Context HttpServletRequest request) {
		return (User) request.getSession().getAttribute("user");
	}

	@POST
	@Path("/changePassword")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response changePassword(User user, @Context HttpServletRequest request) {
		User u = (User) request.getSession().getAttribute("user");
		u.setPassword(user.getPassword());

		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		userDao.save(u);

		if (!userDao.saveUsers(ctx.getRealPath(""))) {
			return Response.status(400).entity("Password wasn't saved!").build();
		}

		return Response.status(200).build();
	}

	@POST
	@Path("/editProfile")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response editProfile(User user, @Context HttpServletRequest request) {
		User u = (User) request.getSession().getAttribute("user");
		u.setFirstName(user.getFirstName());
		u.setLastName(user.getLastName());
		u.setGender(user.getGender());

		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		userDao.save(u);

		if (!userDao.saveUsers(ctx.getRealPath(""))) {
			return Response.status(400).entity("Profile wasn't updated!").build();
		}
		request.getSession().setAttribute("user", u);

		return Response.status(200).build();
	}
}