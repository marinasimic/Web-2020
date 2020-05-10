package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Apartment;
import beans.User;
import dao.ApartmentDAO;
import dao.UserDAO;

@Path("/apartments")
public class ApartmentService {
    @Context
    ServletContext ctx;

    public ApartmentService() {
    }

    @PostConstruct
    public void init() {
        if (ctx.getAttribute("apartmentDAO") == null) {
            String contextPath = ctx.getRealPath("");
            ctx.setAttribute("apartmentDAO", new ApartmentDAO(contextPath));
        }
    }

    @POST
    @Path("/editApartment")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editApartment(Apartment apartment, @Context HttpServletRequest request) {
        Apartment a = (Apartment) request.getSession().getAttribute("apartment");

        // TODO: Set all fields from the request

        return Response.status(200).build();
    }
}