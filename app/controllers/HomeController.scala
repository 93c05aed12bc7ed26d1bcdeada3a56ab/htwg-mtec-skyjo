package controllers

import de.htwg.se.skyjo.Skyjo
import javax.inject._
import play.api.mvc._

@Singleton
class HomeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  val gameController = Skyjo.controller

  def about() = Action {
    Ok(views.html.index())
  }

  def skyjo = Action {
    Ok(views.html.game(gameController))
  }

  def newGame = Action {
    gameController.newGame()
    Ok(views.html.game(gameController))
  }

  def addPlayer(player: String) = Action {
    gameController.createPlayer(player)
    Ok(views.html.game(gameController))
  }

  def uncover(posX: Int, posY: Int, player: Int) = Action {
    gameController.doMove(posX, posY, player)
    Ok(views.html.game(gameController))
  }

  def getCard(posY: Int, posX: Int, player: Int) = Action {
    gameController.getCard(posY, posX, player)
    Ok(views.html.game(gameController))
  }

  def drawCard() = Action {
    gameController.drawCard
    Ok(views.html.game(gameController))
  }

  def tradeCard() = Action {
    gameController.trade = true
    Ok(views.html.game(gameController))
  }

}
