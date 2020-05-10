package services;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Amenity;
import dao.AmenityDAO;

@Path("/amenities")
public class AmenityService{
	@Context
	ServletContext ctx;

	public AmenityService() {
	}

	@PostConstruct
	public void init() {
		if (ctx.getAttribute("amenityDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("amenityDAO", new AmenityDAO(contextPath));
		}
	}
	
	@GET
	@Path("/getAll")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Amenity> getAll(@Context HttpServletRequest request) {
		AmenityDAO aDAO = (AmenityDAO)ctx.getAttribute("amenityDAO");
		return aDAO.findAll();
	}
}