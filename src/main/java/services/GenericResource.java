package services;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import model.Genius;
import model.Type;

@Path("genius")
public class GenericResource {

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Genius newGame(@Context HttpServletRequest request) {
        Genius game = new Genius();
        HttpSession session = request.getSession();
        session.setAttribute("game", game);
        return game;
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Genius getColor(@Context HttpServletRequest request, Message msg) {
        HttpSession session = request.getSession();
        Genius game = (Genius) session.getAttribute("game");
        int color = msg.getColor();
        game.checkColor(color);
        if(game.getType() == Type.WRONG_COLOR) {
            session.invalidate();
        }
        return game;
    }
}
