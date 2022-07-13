package services;

import jakarta.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Message {
    private int color;

    public int getColor() {
        return color;
    }

    public void setColor(int letter) {
        this.color = letter;
    }
}
