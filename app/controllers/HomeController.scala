package controllers

import de.htwg.se.skyjo.Skyjo
import javax.inject._
import play.api.mvc._

@Singleton
class HomeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  val gameController = Skyjo.controller
  gameController.createPlayer("Dennis")
  gameController.createPlayer("Matthias")
  val hand = gameController.boardToString()

  def about() = Action {
    Ok(views.html.index())
  }

  def skyjo = Action {
    Ok(hand)
  }

  def playerList = Action {
    Ok(gameController.players.toString())
  }

  def addPlayer(player: String) = Action {
    gameController.createPlayer(player)
    Ok("Successful created Player: " + player)
  }

  def uncover(posX: Int, posY: Int, player: Int) = Action {
    gameController.setCursor(posX, posY, gameController.players(player))
    gameController.uncoverCard(gameController.players(player))
    Ok("Uncovered Card for Player: " + player)
  }

}
