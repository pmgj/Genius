package servlets;

import java.io.IOException;

import jakarta.json.bind.JsonbBuilder;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import model.Genius;
import model.Type;

@MultipartConfig
@WebServlet("/ServletGenius")
public class ServletGenius extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        Genius game = new Genius();
        HttpSession session = request.getSession();
        session.setAttribute("game", game);
        response.getWriter().print(JsonbBuilder.create().toJson(game));
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        int color = Integer.parseInt(request.getParameter("color"));
        HttpSession session = request.getSession();
        Genius game = (Genius) session.getAttribute("game");
        game.checkColor(color);
        if(game.getType() == Type.WRONG_COLOR) {
            session.invalidate();
        }
        response.getWriter().print(JsonbBuilder.create().toJson(game));
    }
}
