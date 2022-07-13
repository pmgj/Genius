package model;

import java.util.ArrayList;
import java.util.List;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Genius {

    private Type type;
    private final List<Integer> colors = new ArrayList<>();
    private int index = 0;

    public Genius() {
        colors.add((int) Math.floor(Math.random() * 4));
    }

    public void checkColor(int color) {
        if (color != colors.get(index)) {
            colors.clear();
            index = 0;
            type = Type.WRONG_COLOR;
        } else {
            if (colors.size() == ++index) {
                index = 0;
                colors.add((int) Math.floor(Math.random() * 4));
                type = Type.NEW_COLOR;
            } else {
                type = Type.CORRECT_COLOR;
            }
        }
    }

    @XmlElement
    public List<Integer> getColors() {
        return colors;
    }

    @XmlElement
    public Type getType() {
        return type;
    }

    @XmlElement
    public int getIndex() {
        return index;
    }
}
