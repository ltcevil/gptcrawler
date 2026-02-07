# Documentation page not found - Read the Docs Community

**URL:** https://docs.telethon.dev/en/stable/quick-references/flask.pocoo.org/

---

404 Documentation page not found

[docs.telethon.dev](/)

The documentation page you requested does not exist or may have been removed.


---

# Events Reference — Telethon 1.42.0 documentation

**URL:** https://docs.telethon.dev/en/stable/quick-references/events-reference.html

---

-   [](../index.html)
-   Events Reference
-   [View page source](../_sources/quick-references/events-reference.rst.txt)

* * *

# [Events Reference](#id1)[](#events-reference "Link to this heading")

Here you will find a quick summary of all the methods and properties that you can access when working with events.

You can access the client that creates this event by doing `event.client`, and you should view the description of the events to find out what arguments it allows on creation and its **attributes** (the properties will be shown here).

Important

Remember that **all events base** [`ChatGetter`](../modules/custom.html#telethon.tl.custom.chatgetter.ChatGetter "telethon.tl.custom.chatgetter.ChatGetter")! Please see [FAQ](faq.html#faq) if you don’t know what this means or the implications of it.

Contents

-   [Events Reference](#events-reference)
    
    -   [NewMessage](#newmessage)
        
    -   [MessageEdited](#messageedited)
        
    -   [MessageDeleted](#messagedeleted)
        
    -   [MessageRead](#messageread)
        
    -   [ChatAction](#chataction)
        
    -   [UserUpdate](#userupdate)
        
    -   [CallbackQuery](#callbackquery)
        
    -   [InlineQuery](#inlinequery)
        
    -   [Album](#album)
        
    -   [Raw](#raw)
        

## [NewMessage](#id2)[](#newmessage "Link to this heading")

Occurs whenever a new text message or a message with media arrives.

Note

The new message event **should be treated as** a normal [`Message`](../modules/custom.html#telethon.tl.custom.message.Message "telethon.tl.custom.message.Message"), with the following exceptions:

-   `pattern_match` is the match object returned by `pattern=`.
    
-   `message` is **not** the message string. It’s the [`Message`](../modules/custom.html#telethon.tl.custom.message.Message "telethon.tl.custom.message.Message") object.
    

Remember, this event is just a proxy over the message, so while you won’t see its attributes and properties, you can still access them. Please see the full documentation for examples.

Full documentation for the [`NewMessage`](../modules/events.html#telethon.events.newmessage.NewMessage "telethon.events.newmessage.NewMessage").

## [MessageEdited](#id3)[](#messageedited "Link to this heading")

Occurs whenever a message is edited. Just like [`NewMessage`](../modules/events.html#telethon.events.newmessage.NewMessage "telethon.events.newmessage.NewMessage"), you should treat this event as a [`Message`](../modules/custom.html#telethon.tl.custom.message.Message "telethon.tl.custom.message.Message").

Full documentation for the [`MessageEdited`](../modules/events.html#telethon.events.messageedited.MessageEdited "telethon.events.messageedited.MessageEdited").

## [MessageDeleted](#id4)[](#messagedeleted "Link to this heading")

Occurs whenever a message is deleted. Note that this event isn’t 100% reliable, since Telegram doesn’t always notify the clients that a message was deleted.

It only has the `deleted_id` and `deleted_ids` attributes (in addition to the chat if the deletion happened in a channel).

Full documentation for the [`MessageDeleted`](../modules/events.html#telethon.events.messagedeleted.MessageDeleted "telethon.events.messagedeleted.MessageDeleted").

## [MessageRead](#id5)[](#messageread "Link to this heading")

Occurs whenever one or more messages are read in a chat.

Full documentation for the [`MessageRead`](../modules/events.html#telethon.events.messageread.MessageRead "telethon.events.messageread.MessageRead").

[`inbox`](../modules/events.html#telethon.events.messageread.MessageRead.Event.inbox "telethon.events.messageread.MessageRead.Event.inbox")

[`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.14)") if you have read someone else's messages.

[`message_ids`](../modules/events.html#telethon.events.messageread.MessageRead.Event.message_ids "telethon.events.messageread.MessageRead.Event.message_ids")

The IDs of the messages **which contents'** were read.

[`get_messages`](../modules/events.html#telethon.events.messageread.MessageRead.Event.get_messages "telethon.events.messageread.MessageRead.Event.get_messages")

Returns the list of [`Message`](../modules/custom.html#telethon.tl.custom.message.Message "telethon.tl.custom.message.Message") **which contents'** were read.

[`is_read`](../modules/events.html#telethon.events.messageread.MessageRead.Event.is_read "telethon.events.messageread.MessageRead.Event.is_read")

Returns [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.14)") if the given message (or its ID) has been read.

## [ChatAction](#id6)[](#chataction "Link to this heading")

Occurs on certain chat actions, such as chat title changes, user join or leaves, pinned messages, photo changes, etc.

Full documentation for the [`ChatAction`](../modules/events.html#telethon.events.chataction.ChatAction "telethon.events.chataction.ChatAction").

[`added_by`](../modules/events.html#telethon.events.chataction.ChatAction.Event.added_by "telethon.events.chataction.ChatAction.Event.added_by")

The user who added `users`, if applicable ([`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.14)") otherwise).

[`kicked_by`](../modules/events.html#telethon.events.chataction.ChatAction.Event.kicked_by "telethon.events.chataction.ChatAction.Event.kicked_by")

The user who kicked `users`, if applicable ([`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.14)") otherwise).

[`user`](../modules/events.html#telethon.events.chataction.ChatAction.Event.user "telethon.events.chataction.ChatAction.Event.user")

The first user that takes part in this action.

[`input_user`](../modules/events.html#telethon.events.chataction.ChatAction.Event.input_user "telethon.events.chataction.ChatAction.Event.input_user")

Input version of the `self.user` property.

[`user_id`](../modules/events.html#telethon.events.chataction.ChatAction.Event.user_id "telethon.events.chataction.ChatAction.Event.user_id")

Returns the marked signed ID of the first user, if any.

[`users`](../modules/events.html#telethon.events.chataction.ChatAction.Event.users "telethon.events.chataction.ChatAction.Event.users")

A list of users that take part in this action.

[`input_users`](../modules/events.html#telethon.events.chataction.ChatAction.Event.input_users "telethon.events.chataction.ChatAction.Event.input_users")

Input version of the `self.users` property.

[`user_ids`](../modules/events.html#telethon.events.chataction.ChatAction.Event.user_ids "telethon.events.chataction.ChatAction.Event.user_ids")

Returns the marked signed ID of the users, if any.

[`respond`](../modules/events.html#telethon.events.chataction.ChatAction.Event.respond "telethon.events.chataction.ChatAction.Event.respond")

Responds to the chat action message (not as a reply).

[`reply`](../modules/events.html#telethon.events.chataction.ChatAction.Event.reply "telethon.events.chataction.ChatAction.Event.reply")

Replies to the chat action message (as a reply).

[`delete`](../modules/events.html#telethon.events.chataction.ChatAction.Event.delete "telethon.events.chataction.ChatAction.Event.delete")

Deletes the chat action message.

[`get_pinned_message`](../modules/events.html#telethon.events.chataction.ChatAction.Event.get_pinned_message "telethon.events.chataction.ChatAction.Event.get_pinned_message")

If `new_pin` is [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.14)"), this returns the [`Message`](../modules/custom.html#telethon.tl.custom.message.Message "telethon.tl.custom.message.Message") object that was pinned.

[`get_added_by`](../modules/events.html#telethon.events.chataction.ChatAction.Event.get_added_by "telethon.events.chataction.ChatAction.Event.get_added_by")

Returns [`added_by`](../modules/events.html#telethon.events.chataction.ChatAction.Event.added_by "telethon.events.chataction.ChatAction.Event.added_by") but will make an API call if necessary.

[`get_kicked_by`](../modules/events.html#telethon.events.chataction.ChatAction.Event.get_kicked_by "telethon.events.chataction.ChatAction.Event.get_kicked_by")

Returns [`kicked_by`](../modules/events.html#telethon.events.chataction.ChatAction.Event.kicked_by "telethon.events.chataction.ChatAction.Event.kicked_by") but will make an API call if necessary.

[`get_user`](../modules/events.html#telethon.events.chataction.ChatAction.Event.get_user "telethon.events.chataction.ChatAction.Event.get_user")

Returns [`user`](../modules/events.html#telethon.events.chataction.ChatAction.Event.user "telethon.events.chataction.ChatAction.Event.user") but will make an API call if necessary.

[`get_input_user`](../modules/events.html#telethon.events.chataction.ChatAction.Event.get_input_user "telethon.events.chataction.ChatAction.Event.get_input_user")

Returns [`input_user`](../modules/events.html#telethon.events.chataction.ChatAction.Event.input_user "telethon.events.chataction.ChatAction.Event.input_user") but will make an API call if necessary.

[`get_users`](../modules/events.html#telethon.events.chataction.ChatAction.Event.get_users "telethon.events.chataction.ChatAction.Event.get_users")

Returns [`users`](../modules/events.html#telethon.events.chataction.ChatAction.Event.users "telethon.events.chataction.ChatAction.Event.users") but will make an API call if necessary.

[`get_input_users`](../modules/events.html#telethon.events.chataction.ChatAction.Event.get_input_users "telethon.events.chataction.ChatAction.Event.get_input_users")

Returns [`input_users`](../modules/events.html#telethon.events.chataction.ChatAction.Event.input_users "telethon.events.chataction.ChatAction.Event.input_users") but will make an API call if necessary.

## [UserUpdate](#id7)[](#userupdate "Link to this heading")

Occurs whenever a user goes online, starts typing, etc.

Full documentation for the [`UserUpdate`](../modules/events.html#telethon.events.userupdate.UserUpdate "telethon.events.userupdate.UserUpdate").

[`user`](../modules/events.html#telethon.events.userupdate.UserUpdate.Event.user "telethon.events.userupdate.UserUpdate.Event.user")

Alias for [`sender`](../modules/custom.html#telethon.tl.custom.sendergetter.SenderGetter.sender "telethon.tl.custom.sendergetter.SenderGetter.sender").

[`input_user`](../modules/events.html#telethon.events.userupdate.UserUpdate.Event.input_user "telethon.events.userupdate.UserUpdate.Event.input_user")

Alias for [`input_sender`](../modules/custom.html#telethon.tl.custom.sendergetter.SenderGetter.input_sender "telethon.tl.custom.sendergetter.SenderGetter.input_sender").

[`user_id`](../modules/events.html#telethon.events.userupdate.UserUpdate.Event.user_id "telethon.events.userupdate.UserUpdate.Event.user_id")

Alias for [`sender_id`](../modules/custom.html#telethon.tl.custom.sendergetter.SenderGetter.sender_id "telethon.tl.custom.sendergetter.SenderGetter.sender_id").

[`get_user`](../modules/events.html#telethon.events.userupdate.UserUpdate.Event.get_user "telethon.events.userupdate.UserUpdate.Event.get_user")

Alias for [`get_sender`](../modules/custom.html#telethon.tl.custom.sendergetter.SenderGetter.get_sender "telethon.tl.custom.sendergetter.SenderGetter.get_sender").

[`get_input_user`](../modules/events.html#telethon.events.userupdate.UserUpdate.Event.get_input_user "telethon.events.userupdate.UserUpdate.Event.get_input_user")

Alias for [`get_input_sender`](../modules/custom.html#telethon.tl.custom.sendergetter.SenderGetter.get_input_sender "telethon.tl.custom.sendergetter.SenderGetter.get_input_sender").

[`typing`](../modules/events.html#telethon.events.userupdate.UserUpdate.Event.typing "telethon.events.userupdate.UserUpdate.Event.typing")

[`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.14)") if the action is typing a message.

[`uploading`](../modules/events.html#telethon.events.userupdate.UserUpdate.Event.uploading "telethon.events.userupdate.UserUpdate.Event.uploading")

[`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.14)") if the action is uploading something.

[`recording`](../modules/events.html#telethon.events.userupdate.UserUpdate.Event.recording "telethon.events.userupdate.UserUpdate.Event.recording")

[`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.14)") if the action is recording something.

[`playing`](../modules/events.html#telethon.events.userupdate.UserUpdate.Event.playing "telethon.events.userupdate.UserUpdate.Event.playing")

[`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.14)") if the action is playing a game.

[`cancel`](../modules/events.html#telethon.events.userupdate.UserUpdate.Event.cancel "telethon.events.userupdate.UserUpdate.Event.cancel")

[`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.14)") if the action was cancelling other actions.

[`geo`](../modules/events.html#telethon.events.userupdate.UserUpdate.Event.geo "telethon.events.userupdate.UserUpdate.Event.geo")

[`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.14)") if what's being uploaded is a geo.

[`audio`](../modules/events.html#telethon.events.userupdate.UserUpdate.Event.audio "telethon.events.userupdate.UserUpdate.Event.audio")

[`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.14)") if what's being recorded/uploaded is an audio.

[`round`](../modules/events.html#telethon.events.userupdate.UserUpdate.Event.round "telethon.events.userupdate.UserUpdate.Event.round")

[`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.14)") if what's being recorded/uploaded is a round video.

[`video`](../modules/events.html#telethon.events.userupdate.UserUpdate.Event.video "telethon.events.userupdate.UserUpdate.Event.video")

[`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.14)") if what's being recorded/uploaded is an video.

[`contact`](../modules/events.html#telethon.events.userupdate.UserUpdate.Event.contact "telethon.events.userupdate.UserUpdate.Event.contact")

[`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.14)") if what's being uploaded (selected) is a contact.

[`document`](../modules/events.html#telethon.events.userupdate.UserUpdate.Event.document "telethon.events.userupdate.UserUpdate.Event.document")

[`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.14)") if what's being uploaded is document.

[`photo`](../modules/events.html#telethon.events.userupdate.UserUpdate.Event.photo "telethon.events.userupdate.UserUpdate.Event.photo")

[`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.14)") if what's being uploaded is a photo.

[`last_seen`](../modules/events.html#telethon.events.userupdate.UserUpdate.Event.last_seen "telethon.events.userupdate.UserUpdate.Event.last_seen")

Exact [`datetime.datetime`](https://docs.python.org/3/library/datetime.html#datetime.datetime "(in Python v3.14)") when the user was last seen if known.

[`until`](../modules/events.html#telethon.events.userupdate.UserUpdate.Event.until "telethon.events.userupdate.UserUpdate.Event.until")

The [`datetime.datetime`](https://docs.python.org/3/library/datetime.html#datetime.datetime "(in Python v3.14)") until when the user should appear online.

[`online`](../modules/events.html#telethon.events.userupdate.UserUpdate.Event.online "telethon.events.userupdate.UserUpdate.Event.online")

[`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.14)") if the user is currently online,

[`recently`](../modules/events.html#telethon.events.userupdate.UserUpdate.Event.recently "telethon.events.userupdate.UserUpdate.Event.recently")

[`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.14)") if the user was seen within a day.

[`within_weeks`](../modules/events.html#telethon.events.userupdate.UserUpdate.Event.within_weeks "telethon.events.userupdate.UserUpdate.Event.within_weeks")

[`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.14)") if the user was seen within 7 days.

[`within_months`](../modules/events.html#telethon.events.userupdate.UserUpdate.Event.within_months "telethon.events.userupdate.UserUpdate.Event.within_months")

[`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.14)") if the user was seen within 30 days.

## [CallbackQuery](#id8)[](#callbackquery "Link to this heading")

Occurs whenever you sign in as a bot and a user clicks one of the inline buttons on your messages.

Full documentation for the [`CallbackQuery`](../modules/events.html#telethon.events.callbackquery.CallbackQuery "telethon.events.callbackquery.CallbackQuery").

[`id`](../modules/events.html#telethon.events.callbackquery.CallbackQuery.Event.id "telethon.events.callbackquery.CallbackQuery.Event.id")

Returns the query ID.

[`message_id`](../modules/events.html#telethon.events.callbackquery.CallbackQuery.Event.message_id "telethon.events.callbackquery.CallbackQuery.Event.message_id")

Returns the message ID to which the clicked inline button belongs.

[`data`](../modules/events.html#telethon.events.callbackquery.CallbackQuery.Event.data "telethon.events.callbackquery.CallbackQuery.Event.data")

Returns the data payload from the original inline button.

[`chat_instance`](../modules/events.html#telethon.events.callbackquery.CallbackQuery.Event.chat_instance "telethon.events.callbackquery.CallbackQuery.Event.chat_instance")

Unique identifier for the chat where the callback occurred.

[`via_inline`](../modules/events.html#telethon.events.callbackquery.CallbackQuery.Event.via_inline "telethon.events.callbackquery.CallbackQuery.Event.via_inline")

Whether this callback was generated from an inline button sent via an inline query or not.

[`respond`](../modules/events.html#telethon.events.callbackquery.CallbackQuery.Event.respond "telethon.events.callbackquery.CallbackQuery.Event.respond")

Responds to the message (not as a reply).

[`reply`](../modules/events.html#telethon.events.callbackquery.CallbackQuery.Event.reply "telethon.events.callbackquery.CallbackQuery.Event.reply")

Replies to the message (as a reply).

[`edit`](../modules/events.html#telethon.events.callbackquery.CallbackQuery.Event.edit "telethon.events.callbackquery.CallbackQuery.Event.edit")

Edits the message.

[`delete`](../modules/events.html#telethon.events.callbackquery.CallbackQuery.Event.delete "telethon.events.callbackquery.CallbackQuery.Event.delete")

Deletes the message.

[`answer`](../modules/events.html#telethon.events.callbackquery.CallbackQuery.Event.answer "telethon.events.callbackquery.CallbackQuery.Event.answer")

Answers the callback query (and stops the loading circle).

[`get_message`](../modules/events.html#telethon.events.callbackquery.CallbackQuery.Event.get_message "telethon.events.callbackquery.CallbackQuery.Event.get_message")

Returns the message to which the clicked inline button belongs.

## [InlineQuery](#id9)[](#inlinequery "Link to this heading")

Occurs whenever you sign in as a bot and a user sends an inline query such as `@bot query`.

Full documentation for the [`InlineQuery`](../modules/events.html#telethon.events.inlinequery.InlineQuery "telethon.events.inlinequery.InlineQuery").

[`id`](../modules/events.html#telethon.events.inlinequery.InlineQuery.Event.id "telethon.events.inlinequery.InlineQuery.Event.id")

Returns the unique identifier for the query ID.

[`text`](../modules/events.html#telethon.events.inlinequery.InlineQuery.Event.text "telethon.events.inlinequery.InlineQuery.Event.text")

Returns the text the user used to make the inline query.

[`offset`](../modules/events.html#telethon.events.inlinequery.InlineQuery.Event.offset "telethon.events.inlinequery.InlineQuery.Event.offset")

The string the user's client used as an offset for the query.

[`geo`](../modules/events.html#telethon.events.inlinequery.InlineQuery.Event.geo "telethon.events.inlinequery.InlineQuery.Event.geo")

If the user location is requested when using inline mode and the user's device is able to send it, this will return the [GeoPoint](https://tl.telethon.dev/?q=GeoPoint) with the position of the user.

[`builder`](../modules/events.html#telethon.events.inlinequery.InlineQuery.Event.builder "telethon.events.inlinequery.InlineQuery.Event.builder")

Returns a new [`InlineBuilder`](../modules/custom.html#telethon.tl.custom.inlinebuilder.InlineBuilder "telethon.tl.custom.inlinebuilder.InlineBuilder") instance.

[`answer`](../modules/events.html#telethon.events.inlinequery.InlineQuery.Event.answer "telethon.events.inlinequery.InlineQuery.Event.answer")

Answers the inline query with the given results.

## [Album](#id10)[](#album "Link to this heading")

Occurs whenever you receive an entire album.

Full documentation for the [`Album`](../modules/events.html#telethon.events.album.Album "telethon.events.album.Album").

[`grouped_id`](../modules/events.html#telethon.events.album.Album.Event.grouped_id "telethon.events.album.Album.Event.grouped_id")

The shared `grouped_id` between all the messages.

[`text`](../modules/events.html#telethon.events.album.Album.Event.text "telethon.events.album.Album.Event.text")

The message text of the first photo with a caption, formatted using the client's default parse mode.

[`raw_text`](../modules/events.html#telethon.events.album.Album.Event.raw_text "telethon.events.album.Album.Event.raw_text")

The raw message text of the first photo with a caption, ignoring any formatting.

[`is_reply`](../modules/events.html#telethon.events.album.Album.Event.is_reply "telethon.events.album.Album.Event.is_reply")

[`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.14)") if the album is a reply to some other message.

[`forward`](../modules/events.html#telethon.events.album.Album.Event.forward "telethon.events.album.Album.Event.forward")

The [`Forward`](../modules/custom.html#telethon.tl.custom.forward.Forward "telethon.tl.custom.forward.Forward") information for the first message in the album if it was forwarded.

[`get_reply_message`](../modules/events.html#telethon.events.album.Album.Event.get_reply_message "telethon.events.album.Album.Event.get_reply_message")

The [`Message`](../modules/custom.html#telethon.tl.custom.message.Message "telethon.tl.custom.message.Message") that this album is replying to, or [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.14)").

[`respond`](../modules/events.html#telethon.events.album.Album.Event.respond "telethon.events.album.Album.Event.respond")

Responds to the album (not as a reply).

[`reply`](../modules/events.html#telethon.events.album.Album.Event.reply "telethon.events.album.Album.Event.reply")

Replies to the first photo in the album (as a reply).

[`forward_to`](../modules/events.html#telethon.events.album.Album.Event.forward_to "telethon.events.album.Album.Event.forward_to")

Forwards the entire album.

[`edit`](../modules/events.html#telethon.events.album.Album.Event.edit "telethon.events.album.Album.Event.edit")

Edits the first caption or the message, or the first messages' caption if no caption is set, iff it's outgoing.

[`delete`](../modules/events.html#telethon.events.album.Album.Event.delete "telethon.events.album.Album.Event.delete")

Deletes the entire album.

[`mark_read`](../modules/events.html#telethon.events.album.Album.Event.mark_read "telethon.events.album.Album.Event.mark_read")

Marks the entire album as read.

[`pin`](../modules/events.html#telethon.events.album.Album.Event.pin "telethon.events.album.Album.Event.pin")

Pins the first photo in the album.

## [Raw](#id11)[](#raw "Link to this heading")

Raw events are not actual events. Instead, they are the raw [Update](https://tl.telethon.dev/?q=Update) object that Telegram sends. You normally shouldn’t need these.

[Previous](client-reference.html "Client Reference") [Next](objects-reference.html "Objects Reference")

* * *

© Copyright 2017 - 2019, Lonami.

Built with [Sphinx](https://www.sphinx-doc.org/) using a [theme](https://github.com/readthedocs/sphinx_rtd_theme) provided by [Read the Docs](https://readthedocs.org).


---

# Client Reference — Telethon 1.42.0 documentation

**URL:** https://docs.telethon.dev/en/stable/quick-references/client-reference.html

---

-   [](../index.html)
-   Client Reference
-   [View page source](../_sources/quick-references/client-reference.rst.txt)

* * *

# [Client Reference](#id1)[](#client-reference "Link to this heading")

This page contains a summary of all the important methods and properties that you may need when using Telethon. They are sorted by relevance and are not in alphabetical order.

You should use this page to learn about which methods are available, and if you need a usage example or further description of the arguments, be sure to follow the links.

Contents

-   [Client Reference](#client-reference)
    
    -   [TelegramClient](#telegramclient)
        
        -   [Auth](#auth)
            
        -   [Base](#base)
            
        -   [Messages](#messages)
            
        -   [Uploads](#uploads)
            
        -   [Downloads](#downloads)
            
        -   [Dialogs](#dialogs)
            
        -   [Users](#users)
            
        -   [Chats](#chats)
            
        -   [Parse Mode](#parse-mode)
            
        -   [Updates](#updates)
            
        -   [Bots](#bots)
            
        -   [Buttons](#buttons)
            
        -   [Account](#account)
            

## [TelegramClient](#id2)[](#telegramclient "Link to this heading")

This is a summary of the methods and properties you will find at [TelegramClient](../modules/client.html#telethon-client).

### [Auth](#id3)[](#auth "Link to this heading")

[`start`](../modules/client.html#telethon.client.auth.AuthMethods.start "telethon.client.auth.AuthMethods.start")

Starts the client (connects and logs in if necessary).

[`send_code_request`](../modules/client.html#telethon.client.auth.AuthMethods.send_code_request "telethon.client.auth.AuthMethods.send_code_request")

Sends the Telegram code needed to login to the given phone number.

[`sign_in`](../modules/client.html#telethon.client.auth.AuthMethods.sign_in "telethon.client.auth.AuthMethods.sign_in")

Logs in to Telegram to an existing user or bot account.

[`qr_login`](../modules/client.html#telethon.client.auth.AuthMethods.qr_login "telethon.client.auth.AuthMethods.qr_login")

Initiates the QR login procedure.

[`log_out`](../modules/client.html#telethon.client.auth.AuthMethods.log_out "telethon.client.auth.AuthMethods.log_out")

Logs out Telegram and deletes the current `*.session` file.

[`edit_2fa`](../modules/client.html#telethon.client.auth.AuthMethods.edit_2fa "telethon.client.auth.AuthMethods.edit_2fa")

Changes the 2FA settings of the logged in user.

### [Base](#id4)[](#base "Link to this heading")

[`connect`](../modules/client.html#telethon.client.telegrambaseclient.TelegramBaseClient.connect "telethon.client.telegrambaseclient.TelegramBaseClient.connect")

Connects to Telegram.

[`disconnect`](../modules/client.html#telethon.client.telegrambaseclient.TelegramBaseClient.disconnect "telethon.client.telegrambaseclient.TelegramBaseClient.disconnect")

Disconnects from Telegram.

[`is_connected`](../modules/client.html#telethon.client.telegrambaseclient.TelegramBaseClient.is_connected "telethon.client.telegrambaseclient.TelegramBaseClient.is_connected")

Returns [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.14)") if the user has connected.

[`disconnected`](../modules/client.html#telethon.client.telegrambaseclient.TelegramBaseClient.disconnected "telethon.client.telegrambaseclient.TelegramBaseClient.disconnected")

Property with a `Future` that resolves upon disconnection.

[`loop`](../modules/client.html#telethon.client.telegrambaseclient.TelegramBaseClient.loop "telethon.client.telegrambaseclient.TelegramBaseClient.loop")

Property with the `asyncio` event loop used by this client.

[`set_proxy`](../modules/client.html#telethon.client.telegrambaseclient.TelegramBaseClient.set_proxy "telethon.client.telegrambaseclient.TelegramBaseClient.set_proxy")

Changes the proxy which will be used on next (re)connection.

### [Messages](#id5)[](#messages "Link to this heading")

[`send_message`](../modules/client.html#telethon.client.messages.MessageMethods.send_message "telethon.client.messages.MessageMethods.send_message")

Sends a message to the specified user, chat or channel.

[`edit_message`](../modules/client.html#telethon.client.messages.MessageMethods.edit_message "telethon.client.messages.MessageMethods.edit_message")

Edits the given message to change its text or media.

[`delete_messages`](../modules/client.html#telethon.client.messages.MessageMethods.delete_messages "telethon.client.messages.MessageMethods.delete_messages")

Deletes the given messages, optionally "for everyone".

[`forward_messages`](../modules/client.html#telethon.client.messages.MessageMethods.forward_messages "telethon.client.messages.MessageMethods.forward_messages")

Forwards the given messages to the specified entity.

[`iter_messages`](../modules/client.html#telethon.client.messages.MessageMethods.iter_messages "telethon.client.messages.MessageMethods.iter_messages")

Iterator over the messages for the given chat.

[`get_messages`](../modules/client.html#telethon.client.messages.MessageMethods.get_messages "telethon.client.messages.MessageMethods.get_messages")

Same as [`iter_messages()`](../modules/client.html#telethon.client.messages.MessageMethods.iter_messages "telethon.client.messages.MessageMethods.iter_messages"), but returns a [`TotalList`](../modules/helpers.html#telethon.helpers.TotalList "telethon.helpers.TotalList") instead.

[`pin_message`](../modules/client.html#telethon.client.messages.MessageMethods.pin_message "telethon.client.messages.MessageMethods.pin_message")

Pins a message in a chat.

[`unpin_message`](../modules/client.html#telethon.client.messages.MessageMethods.unpin_message "telethon.client.messages.MessageMethods.unpin_message")

Unpins a message in a chat.

[`send_read_acknowledge`](../modules/client.html#telethon.client.messages.MessageMethods.send_read_acknowledge "telethon.client.messages.MessageMethods.send_read_acknowledge")

Marks messages as read and optionally clears mentions.

### [Uploads](#id6)[](#uploads "Link to this heading")

[`send_file`](../modules/client.html#telethon.client.uploads.UploadMethods.send_file "telethon.client.uploads.UploadMethods.send_file")

Sends message with the given file to the specified entity.

[`upload_file`](../modules/client.html#telethon.client.uploads.UploadMethods.upload_file "telethon.client.uploads.UploadMethods.upload_file")

Uploads a file to Telegram's servers, without sending it.

### [Downloads](#id7)[](#downloads "Link to this heading")

[`download_media`](../modules/client.html#telethon.client.downloads.DownloadMethods.download_media "telethon.client.downloads.DownloadMethods.download_media")

Downloads the given media from a message object.

[`download_profile_photo`](../modules/client.html#telethon.client.downloads.DownloadMethods.download_profile_photo "telethon.client.downloads.DownloadMethods.download_profile_photo")

Downloads the profile photo from the given user, chat or channel.

[`download_file`](../modules/client.html#telethon.client.downloads.DownloadMethods.download_file "telethon.client.downloads.DownloadMethods.download_file")

Low-level method to download files from their input location.

[`iter_download`](../modules/client.html#telethon.client.downloads.DownloadMethods.iter_download "telethon.client.downloads.DownloadMethods.iter_download")

Iterates over a file download, yielding chunks of the file.

### [Dialogs](#id8)[](#dialogs "Link to this heading")

[`iter_dialogs`](../modules/client.html#telethon.client.dialogs.DialogMethods.iter_dialogs "telethon.client.dialogs.DialogMethods.iter_dialogs")

Iterator over the dialogs (open conversations/subscribed channels).

[`get_dialogs`](../modules/client.html#telethon.client.dialogs.DialogMethods.get_dialogs "telethon.client.dialogs.DialogMethods.get_dialogs")

Same as [`iter_dialogs()`](../modules/client.html#telethon.client.dialogs.DialogMethods.iter_dialogs "telethon.client.dialogs.DialogMethods.iter_dialogs"), but returns a [`TotalList`](../modules/helpers.html#telethon.helpers.TotalList "telethon.helpers.TotalList") instead.

[`edit_folder`](../modules/client.html#telethon.client.dialogs.DialogMethods.edit_folder "telethon.client.dialogs.DialogMethods.edit_folder")

Edits the folder used by one or more dialogs to archive them.

[`iter_drafts`](../modules/client.html#telethon.client.dialogs.DialogMethods.iter_drafts "telethon.client.dialogs.DialogMethods.iter_drafts")

Iterator over draft messages.

[`get_drafts`](../modules/client.html#telethon.client.dialogs.DialogMethods.get_drafts "telethon.client.dialogs.DialogMethods.get_drafts")

Same as [`iter_drafts()`](../modules/client.html#telethon.client.dialogs.DialogMethods.iter_drafts "telethon.client.dialogs.DialogMethods.iter_drafts"), but returns a list instead.

[`delete_dialog`](../modules/client.html#telethon.client.dialogs.DialogMethods.delete_dialog "telethon.client.dialogs.DialogMethods.delete_dialog")

Deletes a dialog (leaves a chat or channel).

[`conversation`](../modules/client.html#telethon.client.dialogs.DialogMethods.conversation "telethon.client.dialogs.DialogMethods.conversation")

Creates a [`Conversation`](../modules/custom.html#telethon.tl.custom.conversation.Conversation "telethon.tl.custom.conversation.Conversation") with the given entity.

### [Users](#id9)[](#users "Link to this heading")

[`get_me`](../modules/client.html#telethon.client.users.UserMethods.get_me "telethon.client.users.UserMethods.get_me")

Gets "me", the current [User](https://tl.telethon.dev/?q=User) who is logged in.

[`is_bot`](../modules/client.html#telethon.client.users.UserMethods.is_bot "telethon.client.users.UserMethods.is_bot")

Return [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.14)") if the signed-in user is a bot, [`False`](https://docs.python.org/3/library/constants.html#False "(in Python v3.14)") otherwise.

[`is_user_authorized`](../modules/client.html#telethon.client.users.UserMethods.is_user_authorized "telethon.client.users.UserMethods.is_user_authorized")

Returns [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.14)") if the user is authorized (logged in).

[`get_entity`](../modules/client.html#telethon.client.users.UserMethods.get_entity "telethon.client.users.UserMethods.get_entity")

Turns the given entity into a valid Telegram [User](https://tl.telethon.dev/?q=User), [Chat](https://tl.telethon.dev/?q=Chat) or [Channel](https://tl.telethon.dev/?q=Channel).

[`get_input_entity`](../modules/client.html#telethon.client.users.UserMethods.get_input_entity "telethon.client.users.UserMethods.get_input_entity")

Turns the given entity into its input entity version.

[`get_peer_id`](../modules/client.html#telethon.client.users.UserMethods.get_peer_id "telethon.client.users.UserMethods.get_peer_id")

Gets the ID for the given entity.

### [Chats](#id10)[](#chats "Link to this heading")

[`iter_participants`](../modules/client.html#telethon.client.chats.ChatMethods.iter_participants "telethon.client.chats.ChatMethods.iter_participants")

Iterator over the participants belonging to the specified chat.

[`get_participants`](../modules/client.html#telethon.client.chats.ChatMethods.get_participants "telethon.client.chats.ChatMethods.get_participants")

Same as [`iter_participants()`](../modules/client.html#telethon.client.chats.ChatMethods.iter_participants "telethon.client.chats.ChatMethods.iter_participants"), but returns a [`TotalList`](../modules/helpers.html#telethon.helpers.TotalList "telethon.helpers.TotalList") instead.

[`kick_participant`](../modules/client.html#telethon.client.chats.ChatMethods.kick_participant "telethon.client.chats.ChatMethods.kick_participant")

Kicks a user from a chat.

[`iter_admin_log`](../modules/client.html#telethon.client.chats.ChatMethods.iter_admin_log "telethon.client.chats.ChatMethods.iter_admin_log")

Iterator over the admin log for the specified channel.

[`get_admin_log`](../modules/client.html#telethon.client.chats.ChatMethods.get_admin_log "telethon.client.chats.ChatMethods.get_admin_log")

Same as [`iter_admin_log()`](../modules/client.html#telethon.client.chats.ChatMethods.iter_admin_log "telethon.client.chats.ChatMethods.iter_admin_log"), but returns a `list` instead.

[`iter_profile_photos`](../modules/client.html#telethon.client.chats.ChatMethods.iter_profile_photos "telethon.client.chats.ChatMethods.iter_profile_photos")

Iterator over a user's profile photos or a chat's photos.

[`get_profile_photos`](../modules/client.html#telethon.client.chats.ChatMethods.get_profile_photos "telethon.client.chats.ChatMethods.get_profile_photos")

Same as [`iter_profile_photos()`](../modules/client.html#telethon.client.chats.ChatMethods.iter_profile_photos "telethon.client.chats.ChatMethods.iter_profile_photos"), but returns a [`TotalList`](../modules/helpers.html#telethon.helpers.TotalList "telethon.helpers.TotalList") instead.

[`edit_admin`](../modules/client.html#telethon.client.chats.ChatMethods.edit_admin "telethon.client.chats.ChatMethods.edit_admin")

Edits admin permissions for someone in a chat.

[`edit_permissions`](../modules/client.html#telethon.client.chats.ChatMethods.edit_permissions "telethon.client.chats.ChatMethods.edit_permissions")

Edits user restrictions in a chat.

[`get_permissions`](../modules/client.html#telethon.client.chats.ChatMethods.get_permissions "telethon.client.chats.ChatMethods.get_permissions")

Fetches the permissions of a user in a specific chat or channel or get Default Restricted Rights of Chat or Channel.

[`get_stats`](../modules/client.html#telethon.client.chats.ChatMethods.get_stats "telethon.client.chats.ChatMethods.get_stats")

Retrieves statistics from the given megagroup or broadcast channel.

[`action`](../modules/client.html#telethon.client.chats.ChatMethods.action "telethon.client.chats.ChatMethods.action")

Returns a context-manager object to represent a "chat action".

### [Parse Mode](#id11)[](#parse-mode "Link to this heading")

[`parse_mode`](../modules/client.html#telethon.client.messageparse.MessageParseMethods.parse_mode "telethon.client.messageparse.MessageParseMethods.parse_mode")

This property is the default parse mode used when sending messages.

### [Updates](#id12)[](#updates "Link to this heading")

[`on`](../modules/client.html#telethon.client.updates.UpdateMethods.on "telethon.client.updates.UpdateMethods.on")

Decorator used to [`add_event_handler`](../modules/client.html#telethon.client.updates.UpdateMethods.add_event_handler "telethon.client.updates.UpdateMethods.add_event_handler") more conveniently.

[`run_until_disconnected`](../modules/client.html#telethon.client.updates.UpdateMethods.run_until_disconnected "telethon.client.updates.UpdateMethods.run_until_disconnected")

Runs the event loop until the library is disconnected.

[`add_event_handler`](../modules/client.html#telethon.client.updates.UpdateMethods.add_event_handler "telethon.client.updates.UpdateMethods.add_event_handler")

Registers a new event handler callback.

[`remove_event_handler`](../modules/client.html#telethon.client.updates.UpdateMethods.remove_event_handler "telethon.client.updates.UpdateMethods.remove_event_handler")

Inverse operation of [`add_event_handler()`](../modules/client.html#telethon.client.updates.UpdateMethods.add_event_handler "telethon.client.updates.UpdateMethods.add_event_handler").

[`list_event_handlers`](../modules/client.html#telethon.client.updates.UpdateMethods.list_event_handlers "telethon.client.updates.UpdateMethods.list_event_handlers")

Lists all registered event handlers.

[`catch_up`](../modules/client.html#telethon.client.updates.UpdateMethods.catch_up "telethon.client.updates.UpdateMethods.catch_up")

"Catches up" on the missed updates while the client was offline.

[`set_receive_updates`](../modules/client.html#telethon.client.updates.UpdateMethods.set_receive_updates "telethon.client.updates.UpdateMethods.set_receive_updates")

Change the value of `receive_updates`.

### [Bots](#id13)[](#bots "Link to this heading")

[`inline_query`](../modules/client.html#telethon.client.bots.BotMethods.inline_query "telethon.client.bots.BotMethods.inline_query")

Makes an inline query to the specified bot (`@vote New Poll`).

### [Buttons](#id14)[](#buttons "Link to this heading")

[`build_reply_markup`](../modules/client.html#telethon.client.buttons.ButtonMethods.build_reply_markup "telethon.client.buttons.ButtonMethods.build_reply_markup")

Builds a [ReplyInlineMarkup](https://tl.telethon.dev/?q=ReplyInlineMarkup) or [ReplyKeyboardMarkup](https://tl.telethon.dev/?q=ReplyKeyboardMarkup) for the given buttons.

### [Account](#id15)[](#account "Link to this heading")

[`takeout`](../modules/client.html#telethon.client.account.AccountMethods.takeout "telethon.client.account.AccountMethods.takeout")

Returns a [TelegramClient](../modules/client.html#telethon-client) which calls methods behind a takeout session.

[`end_takeout`](../modules/client.html#telethon.client.account.AccountMethods.end_takeout "telethon.client.account.AccountMethods.end_takeout")

Finishes the current takeout session.

[Previous](faq.html "FAQ") [Next](events-reference.html "Events Reference")

* * *

© Copyright 2017 - 2019, Lonami.

Built with [Sphinx](https://www.sphinx-doc.org/) using a [theme](https://github.com/readthedocs/sphinx_rtd_theme) provided by [Read the Docs](https://readthedocs.org).


---

# FAQ — Telethon 1.42.0 documentation

**URL:** https://docs.telethon.dev/en/stable/quick-references/faq.html

---

-   [](../index.html)
-   FAQ
-   [View page source](../_sources/quick-references/faq.rst.txt)

* * *

# [FAQ](#id2)[](#faq "Link to this heading")

Let’s start the quick references section with some useful tips to keep in mind, with the hope that you will understand why certain things work the way that they do.

Contents

-   [FAQ](#faq)
    
    -   [Code without errors doesn’t work](#code-without-errors-doesn-t-work)
        
    -   [How can I except FloodWaitError?](#how-can-i-except-floodwaiterror)
        
    -   [My account was deleted/limited when using the library](#my-account-was-deleted-limited-when-using-the-library)
        
    -   [How can I use a proxy?](#how-can-i-use-a-proxy)
        
    -   [How do I access a field?](#how-do-i-access-a-field)
        
    -   [AttributeError: ‘coroutine’ object has no attribute ‘id’](#attributeerror-coroutine-object-has-no-attribute-id)
        
    -   [sqlite3.OperationalError: database is locked](#sqlite3-operationalerror-database-is-locked)
        
    -   [event.chat or event.sender is None](#event-chat-or-event-sender-is-none)
        
    -   [File download is slow or sending files takes too long](#file-download-is-slow-or-sending-files-takes-too-long)
        
    -   [What does “Server sent a very new message with ID” mean?](#what-does-server-sent-a-very-new-message-with-id-mean)
        
    -   [What does “Server replied with a wrong session ID” mean?](#what-does-server-replied-with-a-wrong-session-id-mean)
        
    -   [What does “Could not find a matching Constructor ID for the TLObject” mean?](#what-does-could-not-find-a-matching-constructor-id-for-the-tlobject-mean)
        
    -   [What does “Task was destroyed but it is pending” mean?](#what-does-task-was-destroyed-but-it-is-pending-mean)
        
    -   [What does “The asyncio event loop must not change after connection” mean?](#what-does-the-asyncio-event-loop-must-not-change-after-connection-mean)
        
    -   [What does “bases ChatGetter” mean?](#what-does-bases-chatgetter-mean)
        
    -   [Can I send files by ID?](#can-i-send-files-by-id)
        
    -   [Can I use Flask with the library?](#can-i-use-flask-with-the-library)
        
    -   [Can I use Anaconda/Spyder/IPython with the library?](#can-i-use-anaconda-spyder-ipython-with-the-library)
        

## [Code without errors doesn’t work](#id3)[](#code-without-errors-doesn-t-work "Link to this heading")

Then it probably has errors, but you haven’t enabled logging yet. To enable logging, at the following code to the top of your main file:

import logging
logging.basicConfig(format\='\[%(levelname) %(asctime)s\] %(name)s: %(message)s',
                    level\=logging.WARNING)

You can change the logging level to be something different, from less to more information:

level\=logging.CRITICAL  \# won't show errors (same as disabled)
level\=logging.ERROR     \# will only show errors that you didn't handle
level\=logging.WARNING   \# will also show messages with medium severity, such as internal Telegram issues
level\=logging.INFO      \# will also show informational messages, such as connection or disconnections
level\=logging.DEBUG     \# will show a lot of output to help debugging issues in the library

See the official Python documentation for more information on [logging](https://docs.python.org/3/library/logging.html).

## [How can I except FloodWaitError?](#id4)[](#how-can-i-except-floodwaiterror "Link to this heading")

You can use all errors from the API by importing:

from telethon import errors

And except them as such:

try:
    await client.send\_message(chat, 'Hi')
except errors.FloodWaitError as e:
    \# e.seconds is how many seconds you have
    \# to wait before making the request again.
    print('Flood for', e.seconds)

## [My account was deleted/limited when using the library](#id5)[](#my-account-was-deleted-limited-when-using-the-library "Link to this heading")

First and foremost, **this is not a problem exclusive to Telethon. Any third-party library is prone to cause the accounts to appear banned.** Even official applications can make Telegram ban an account under certain circumstances. Third-party libraries such as Telethon are a lot easier to use, and as such, they are misused to spam, which causes Telegram to learn certain patterns and ban suspicious activity.

There is no point in Telethon trying to circumvent this. Even if it succeeded, spammers would then abuse the library again, and the cycle would repeat.

The library will only do things that you tell it to do. If you use the library with bad intentions, Telegram will hopefully ban you.

However, you may also be part of a limited country, such as Iran or Russia. In that case, we have bad news for you. Telegram is much more likely to ban these numbers, as they are often used to spam other accounts, likely through the use of libraries like this one. The best advice we can give you is to not abuse the API, like calling many requests really quickly.

We have also had reports from Kazakhstan and China, where connecting would fail. To solve these connection problems, you should use a proxy.

Telegram may also ban virtual (VoIP) phone numbers, as again, they’re likely to be used for spam.

More recently (year 2023 onwards), Telegram has started putting a lot more measures to prevent spam (with even additions such as anonymous participants in groups or the inability to fetch group members at all). This means some of the anti-spam measures have gotten more aggressive.

The recommendation has usually been to use the library only on well-established accounts (and not an account you just created), and to not perform actions that could be seen as abuse. Telegram decides what those actions are, and they’re free to change how they operate at any time.

If you want to check if your account has been limited, simply send a private message to [@SpamBot](https://t.me/SpamBot) through Telegram itself. You should notice this by getting errors like `PeerFloodError`, which means you’re limited, for instance, when sending a message to some accounts but not others.

For more discussion, please see [issue 297](https://github.com/LonamiWebs/Telethon/issues/297).

## [How can I use a proxy?](#id6)[](#how-can-i-use-a-proxy "Link to this heading")

This was one of the first things described in [Signing In](../basic/signing-in.html#signing-in).

## [How do I access a field?](#id7)[](#how-do-i-access-a-field "Link to this heading")

This is basic Python knowledge. You should use the dot operator:

me \= await client.get\_me()
print(me.username)
\#       ^ we used the dot operator to access the username attribute

result \= await client(functions.photos.GetUserPhotosRequest(
    user\_id\='me',
    offset\=0,
    max\_id\=0,
    limit\=100
))

\# Working with list is also pretty basic
print(result.photos\[0\].sizes\[\-1\].type)
\#           ^       ^ ^       ^ ^
\#           |       | |       | \\ type
\#           |       | |       \\ last size
\#           |       | \\ list of sizes
\#  access   |       \\ first photo from the list
\#  the...   \\ list of photos
#
\# To print all, you could do (or mix-and-match):
for photo in result.photos:
    for size in photo.sizes:
        print(size.type)

## [AttributeError: ‘coroutine’ object has no attribute ‘id’](#id8)[](#attributeerror-coroutine-object-has-no-attribute-id "Link to this heading")

You either forgot to:

import telethon.sync
\#              ^^^^^ import sync

Or:

async def handler(event):
    me \= await client.get\_me()
    \#    ^^^^^ note the await
    print(me.username)

## [sqlite3.OperationalError: database is locked](#id9)[](#sqlite3-operationalerror-database-is-locked "Link to this heading")

An older process is still running and is using the same `'session'` file.

This error occurs when **two or more clients use the same session**, that is, when you write the same session name to be used in the client:

-   You have an older process using the same session file.
    
-   You have two different scripts running (interactive sessions count too).
    
-   You have two clients in the same script running at the same time.
    

The solution is, if you need two clients, use two sessions. If the problem persists and you’re on Linux, you can use `fuser my.session` to find out the process locking the file. As a last resort, you can reboot your system.

If you really dislike SQLite, use a different session storage. There is an entire section covering that at [Session Files](../concepts/sessions.html#sessions).

## [event.chat or event.sender is None](#id10)[](#event-chat-or-event-sender-is-none "Link to this heading")

Telegram doesn’t always send this information in order to save bandwidth. If you need the information, you should fetch it yourself, since the library won’t do unnecessary work unless you need to:

async def handler(event):
    chat \= await event.get\_chat()
    sender \= await event.get\_sender()

## [File download is slow or sending files takes too long](#id11)[](#file-download-is-slow-or-sending-files-takes-too-long "Link to this heading")

The communication with Telegram is encrypted. Encryption requires a lot of math, and doing it in pure Python is very slow. `cryptg` is a library which containns the encryption functions used by Telethon. If it is installed (via `pip install cryptg`), it will automatically be used and should provide a considerable speed boost. You can know whether it’s used by configuring `logging` (at `INFO` level or lower) _before_ importing `telethon`.

Note that the library does _not_ download or upload files in parallel, which can also help with the speed of downloading or uploading a single file. There are snippets online implementing that. The reason why this is not built-in is because the limiting factor in the long run are `FloodWaitError`, and using parallel download or uploads only makes them occur sooner.

## [What does “Server sent a very new message with ID” mean?](#id12)[](#what-does-server-sent-a-very-new-message-with-id-mean "Link to this heading")

You may also see this error as “Server sent a very old message with ID”.

This is a security feature from Telethon that cannot be disabled and is meant to protect you against replay attacks.

When this message is incorrectly reported as a “bug”, the most common patterns seem to be:

-   Your system time is incorrect.
    
-   The proxy you’re using may be interfering somehow.
    
-   The Telethon session is being used or has been used from somewhere else. Make sure that you created the session from Telethon, and are not using the same session anywhere else. If you need to use the same account from multiple places, login and use a different session for each place you need.
    

## [What does “Server replied with a wrong session ID” mean?](#id13)[](#what-does-server-replied-with-a-wrong-session-id-mean "Link to this heading")

This is a security feature from Telethon that cannot be disabled and is meant to protect you against unwanted session reuse.

When this message is reported as a “bug”, the most common patterns seem to be:

-   The proxy you’re using may be interfering somehow.
    
-   The Telethon session is being used or has been used from somewhere else. Make sure that you created the session from Telethon, and are not using the same session anywhere else. If you need to use the same account from multiple places, login and use a different session for each place you need.
    
-   You may be using multiple connections to the Telegram server, which seems to confuse Telegram.
    

Most of the time it should be safe to ignore this warning. If the library still doesn’t behave correctly, make sure to check if any of the above bullet points applies in your case and try to work around it.

If the issue persists and there is a way to reliably reproduce this error, please add a comment with any additional details you can provide to [issue 3759](https://github.com/LonamiWebs/Telethon/issues/3759), and perhaps some additional investigation can be done (but it’s unlikely, as Telegram _is_ sending unexpected data).

## [What does “Could not find a matching Constructor ID for the TLObject” mean?](#id14)[](#what-does-could-not-find-a-matching-constructor-id-for-the-tlobject-mean "Link to this heading")

Telegram uses “layers”, which you can think of as “versions” of the API they offer. When Telethon reads responses that the Telegram servers send, these need to be deserialized (into what Telethon calls “TLObjects”).

Every Telethon version understands a single Telegram layer. When Telethon connects to Telegram, both agree on the layer to use. If the layers don’t match, Telegram may send certain objects which Telethon no longer understands.

When this message is reported as a “bug”, the most common patterns seem to be that the Telethon session is being used or has been used from somewhere else. Make sure that you created the session from Telethon, and are not using the same session anywhere else. If you need to use the same account from multiple places, login and use a different session for each place you need.

## [What does “Task was destroyed but it is pending” mean?](#id15)[](#what-does-task-was-destroyed-but-it-is-pending-mean "Link to this heading")

Your script likely finished abruptly, the `asyncio` event loop got destroyed, and the library did not get a chance to properly close the connection and close the session.

Make sure you’re either using the context manager for the client or always call `await client.disconnect()` (by e.g. using a `try/finally`).

## [What does “The asyncio event loop must not change after connection” mean?](#id16)[](#what-does-the-asyncio-event-loop-must-not-change-after-connection-mean "Link to this heading")

Telethon uses `asyncio`, and makes use of things like tasks and queues internally to manage the connection to the server and match responses to the requests you make. Most of them are initialized after the client is connected.

For example, if the library expects a result to a request made in loop A, but you attempt to get that result in loop B, you will very likely find a deadlock. To avoid a deadlock, the library checks to make sure the loop in use is the same as the one used to initialize everything, and if not, it throws an error.

The most common cause is `asyncio.run`, since it creates a new event loop. If you `asyncio.run` a function to create the client and set it up, and then you `asyncio.run` another function to do work, things won’t work, so the library throws an error early to let you know something is wrong.

Instead, it’s often a good idea to have a single `async def main` and simply `asyncio.run()` it and do all the work there. From it, you’re also able to call other `async def` without having to touch `asyncio.run` again:

\# It's fine to create the client outside as long as you don't connect
client \= TelegramClient(...)

async def main():
    \# Now the client will connect, so the loop must not change from now on.
    \# But as long as you do all the work inside main, including calling
    \# other async functions, things will work.
    async with client:
        ....

if \_\_name\_\_ \== '\_\_main\_\_':
    asyncio.run(main())

Be sure to read the `asyncio` documentation if you want a better understanding of event loop, tasks, and what functions you can use.

## [What does “bases ChatGetter” mean?](#id17)[](#what-does-bases-chatgetter-mean "Link to this heading")

In Python, classes can base others. This is called [inheritance](https://ddg.gg/python%20inheritance). What it means is that “if a class bases another, you can use the other’s methods too”.

For example, [`Message`](../modules/custom.html#telethon.tl.custom.message.Message "telethon.tl.custom.message.Message") _bases_ [`ChatGetter`](../modules/custom.html#telethon.tl.custom.chatgetter.ChatGetter "telethon.tl.custom.chatgetter.ChatGetter"). In turn, [`ChatGetter`](../modules/custom.html#telethon.tl.custom.chatgetter.ChatGetter "telethon.tl.custom.chatgetter.ChatGetter") defines things like [`obj.chat_id`](../modules/custom.html#telethon.tl.custom.chatgetter.ChatGetter "telethon.tl.custom.chatgetter.ChatGetter").

So if you have a message, you can access that too:

\# ChatGetter has a chat\_id property, and Message bases ChatGetter.
\# Thus you can use ChatGetter properties and methods from Message
print(message.chat\_id)

Telegram has a lot to offer, and inheritance helps the library reduce boilerplate, so it’s important to know this concept. For newcomers, this may be a problem, so we explain what it means here in the FAQ.

## [Can I send files by ID?](#id18)[](#can-i-send-files-by-id "Link to this heading")

When people talk about IDs, they often refer to one of two things: the integer ID inside media, and a random-looking long string.

You cannot use the integer ID to send media. Generally speaking, sending media requires a combination of ID, `access_hash` and `file_reference`. The first two are integers, while the last one is a random `bytes` sequence.

-   The integer `id` will always be the same for every account, so every user or bot looking at a particular media file, will see a consistent ID.
    
-   The `access_hash` will always be the same for a given account, but different accounts will each see their own, different `access_hash`. This makes it impossible to get media object from one account and use it in another. The other account must fetch the media object itself.
    
-   The `file_reference` is random for everyone and will only work for a few hours before it expires. It must be refetched before the media can be used (to either resend the media or download it).
    

The second type of “[file ID](https://core.telegram.org/bots/api#inputfile)” people refer to is a concept from the HTTP Bot API. It’s a custom format which encodes enough information to use the media.

Telethon provides an old version of these HTTP Bot API-style file IDs via `message.file.id`, however, this feature is no longer maintained, so it may not work. It will be removed in future versions. Nonetheless, it is possible to find a different Python package (or write your own) to parse these file IDs and construct the necessary input file objects to send or download the media.

## [Can I use Flask with the library?](#id19)[](#can-i-use-flask-with-the-library "Link to this heading")

Yes, if you know what you are doing. However, you will probably have a lot of headaches to get threads and asyncio to work together. Instead, consider using [Quart](https://pgjones.gitlab.io/quart/), an asyncio-based alternative to [Flask](flask.pocoo.org/).

Check out [quart\_login.py](https://github.com/LonamiWebs/Telethon/tree/v1/telethon_examples#quart_loginpy) for an example web-application based on Quart.

## [Can I use Anaconda/Spyder/IPython with the library?](#id20)[](#can-i-use-anaconda-spyder-ipython-with-the-library "Link to this heading")

Yes, but these interpreters run the asyncio event loop implicitly, which interferes with the `telethon.sync` magic module.

If you use them, you should **not** import `sync`:

\# Change any of these...:
from telethon import TelegramClient, sync, ...
from telethon.sync import TelegramClient, ...

\# ...with this:
from telethon import TelegramClient, ...

You are also more likely to get “sqlite3.OperationalError: database is locked” with them. If they cause too much trouble, just write your code in a `.py` file and run that, or use the normal `python` interpreter.

[Previous](../basic/next-steps.html "Next Steps") [Next](client-reference.html "Client Reference")

* * *

© Copyright 2017 - 2019, Lonami.

Built with [Sphinx](https://www.sphinx-doc.org/) using a [theme](https://github.com/readthedocs/sphinx_rtd_theme) provided by [Read the Docs](https://readthedocs.org).


---

# Objects Reference — Telethon 1.42.0 documentation

**URL:** https://docs.telethon.dev/en/stable/quick-references/objects-reference.html

---

-   [](../index.html)
-   Objects Reference
-   [View page source](../_sources/quick-references/objects-reference.rst.txt)

* * *

# [Objects Reference](#id1)[](#objects-reference "Link to this heading")

This is the quick reference for those objects returned by client methods or other useful modules that the library has to offer. They are kept in a separate page to help finding and discovering them.

Remember that this page only shows properties and methods, **not attributes**. Make sure to open the full documentation to find out about the attributes.

Contents

-   [Objects Reference](#objects-reference)
    
    -   [ChatGetter](#chatgetter)
        
    -   [SenderGetter](#sendergetter)
        
    -   [Message](#message)
        
        -   [Properties](#properties)
            
        -   [Methods](#methods)
            
    -   [File](#file)
        
    -   [Conversation](#conversation)
        
    -   [AdminLogEvent](#adminlogevent)
        
    -   [Button](#button)
        
    -   [InlineResult](#inlineresult)
        
    -   [Dialog](#dialog)
        
    -   [Draft](#draft)
        
    -   [Utils](#utils)
        

## [ChatGetter](#id2)[](#chatgetter "Link to this heading")

All events base [`ChatGetter`](../modules/custom.html#telethon.tl.custom.chatgetter.ChatGetter "telethon.tl.custom.chatgetter.ChatGetter"), and some of the objects below do too, so it’s important to know its methods.

[`chat`](../modules/custom.html#telethon.tl.custom.chatgetter.ChatGetter.chat "telethon.tl.custom.chatgetter.ChatGetter.chat")

Returns the [User](https://tl.telethon.dev/?q=User), [Chat](https://tl.telethon.dev/?q=Chat) or [Channel](https://tl.telethon.dev/?q=Channel) where this object belongs to.

[`input_chat`](../modules/custom.html#telethon.tl.custom.chatgetter.ChatGetter.input_chat "telethon.tl.custom.chatgetter.ChatGetter.input_chat")

This [InputPeer](https://tl.telethon.dev/?q=InputPeer) is the input version of the chat where the message was sent.

[`chat_id`](../modules/custom.html#telethon.tl.custom.chatgetter.ChatGetter.chat_id "telethon.tl.custom.chatgetter.ChatGetter.chat_id")

Returns the marked chat integer ID.

[`is_private`](../modules/custom.html#telethon.tl.custom.chatgetter.ChatGetter.is_private "telethon.tl.custom.chatgetter.ChatGetter.is_private")

[`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.14)") if the message was sent as a private message.

[`is_group`](../modules/custom.html#telethon.tl.custom.chatgetter.ChatGetter.is_group "telethon.tl.custom.chatgetter.ChatGetter.is_group")

True if the message was sent on a group or megagroup.

[`is_channel`](../modules/custom.html#telethon.tl.custom.chatgetter.ChatGetter.is_channel "telethon.tl.custom.chatgetter.ChatGetter.is_channel")

[`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.14)") if the message was sent on a megagroup or channel.

[`get_chat`](../modules/custom.html#telethon.tl.custom.chatgetter.ChatGetter.get_chat "telethon.tl.custom.chatgetter.ChatGetter.get_chat")

Returns [`chat`](../modules/custom.html#telethon.tl.custom.chatgetter.ChatGetter.chat "telethon.tl.custom.chatgetter.ChatGetter.chat"), but will make an API call to find the chat unless it's already cached.

[`get_input_chat`](../modules/custom.html#telethon.tl.custom.chatgetter.ChatGetter.get_input_chat "telethon.tl.custom.chatgetter.ChatGetter.get_input_chat")

Returns [`input_chat`](../modules/custom.html#telethon.tl.custom.chatgetter.ChatGetter.input_chat "telethon.tl.custom.chatgetter.ChatGetter.input_chat"), but will make an API call to find the input chat unless it's already cached.

## [SenderGetter](#id3)[](#sendergetter "Link to this heading")

Similar to [`ChatGetter`](../modules/custom.html#telethon.tl.custom.chatgetter.ChatGetter "telethon.tl.custom.chatgetter.ChatGetter"), a [`SenderGetter`](../modules/custom.html#telethon.tl.custom.sendergetter.SenderGetter "telethon.tl.custom.sendergetter.SenderGetter") is the same, but it works for senders instead.

[`sender`](../modules/custom.html#telethon.tl.custom.sendergetter.SenderGetter.sender "telethon.tl.custom.sendergetter.SenderGetter.sender")

Returns the [User](https://tl.telethon.dev/?q=User) or [Channel](https://tl.telethon.dev/?q=Channel) that sent this object.

[`input_sender`](../modules/custom.html#telethon.tl.custom.sendergetter.SenderGetter.input_sender "telethon.tl.custom.sendergetter.SenderGetter.input_sender")

This [InputPeer](https://tl.telethon.dev/?q=InputPeer) is the input version of the user/channel who sent the message.

[`sender_id`](../modules/custom.html#telethon.tl.custom.sendergetter.SenderGetter.sender_id "telethon.tl.custom.sendergetter.SenderGetter.sender_id")

Returns the marked sender integer ID, if present.

[`get_sender`](../modules/custom.html#telethon.tl.custom.sendergetter.SenderGetter.get_sender "telethon.tl.custom.sendergetter.SenderGetter.get_sender")

Returns [`sender`](../modules/custom.html#telethon.tl.custom.sendergetter.SenderGetter.sender "telethon.tl.custom.sendergetter.SenderGetter.sender"), but will make an API call to find the sender unless it's already cached.

[`get_input_sender`](../modules/custom.html#telethon.tl.custom.sendergetter.SenderGetter.get_input_sender "telethon.tl.custom.sendergetter.SenderGetter.get_input_sender")

Returns [`input_sender`](../modules/custom.html#telethon.tl.custom.sendergetter.SenderGetter.input_sender "telethon.tl.custom.sendergetter.SenderGetter.input_sender"), but will make an API call to find the input sender unless it's already cached.

## [Message](#id4)[](#message "Link to this heading")

The [`Message`](../modules/custom.html#telethon.tl.custom.message.Message "telethon.tl.custom.message.Message") type is very important, mostly because we are working with a library for a _messaging_ platform, so messages are widely used: in events, when fetching history, replies, etc.

It bases [`ChatGetter`](../modules/custom.html#telethon.tl.custom.chatgetter.ChatGetter "telethon.tl.custom.chatgetter.ChatGetter") and [`SenderGetter`](../modules/custom.html#telethon.tl.custom.sendergetter.SenderGetter "telethon.tl.custom.sendergetter.SenderGetter").

### [Properties](#id5)[](#properties "Link to this heading")

Note

We document _custom properties_ here, not all the attributes of the [`Message`](../modules/custom.html#telethon.tl.custom.message.Message "telethon.tl.custom.message.Message") (which is the information Telegram actually returns).

[`text`](../modules/custom.html#telethon.tl.custom.message.Message.text "telethon.tl.custom.message.Message.text")

The message text, formatted using the client's default parse mode.

[`raw_text`](../modules/custom.html#telethon.tl.custom.message.Message.raw_text "telethon.tl.custom.message.Message.raw_text")

The raw message text, ignoring any formatting.

[`is_reply`](../modules/custom.html#telethon.tl.custom.message.Message.is_reply "telethon.tl.custom.message.Message.is_reply")

[`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.14)") if the message is a reply to some other message or story.

[`forward`](../modules/custom.html#telethon.tl.custom.message.Message.forward "telethon.tl.custom.message.Message.forward")

The [`Forward`](../modules/custom.html#telethon.tl.custom.forward.Forward "telethon.tl.custom.forward.Forward") information if this message is a forwarded message.

[`buttons`](../modules/custom.html#telethon.tl.custom.message.Message.buttons "telethon.tl.custom.message.Message.buttons")

Returns a list of lists of [`MessageButton`](../modules/custom.html#telethon.tl.custom.messagebutton.MessageButton "telethon.tl.custom.messagebutton.MessageButton"), if any.

[`button_count`](../modules/custom.html#telethon.tl.custom.message.Message.button_count "telethon.tl.custom.message.Message.button_count")

Returns the total button count (sum of all [`buttons`](../modules/custom.html#telethon.tl.custom.message.Message.buttons "telethon.tl.custom.message.Message.buttons") rows).

[`file`](../modules/custom.html#telethon.tl.custom.message.Message.file "telethon.tl.custom.message.Message.file")

Returns a [`File`](../modules/custom.html#telethon.tl.custom.file.File "telethon.tl.custom.file.File") wrapping the [`photo`](../modules/custom.html#telethon.tl.custom.message.Message.photo "telethon.tl.custom.message.Message.photo") or [`document`](../modules/custom.html#telethon.tl.custom.message.Message.document "telethon.tl.custom.message.Message.document") in this message.

[`photo`](../modules/custom.html#telethon.tl.custom.message.Message.photo "telethon.tl.custom.message.Message.photo")

The [Photo](https://tl.telethon.dev/?q=Photo) media in this message, if any.

[`document`](../modules/custom.html#telethon.tl.custom.message.Message.document "telethon.tl.custom.message.Message.document")

The [Document](https://tl.telethon.dev/?q=Document) media in this message, if any.

[`web_preview`](../modules/custom.html#telethon.tl.custom.message.Message.web_preview "telethon.tl.custom.message.Message.web_preview")

The [WebPage](https://tl.telethon.dev/?q=WebPage) media in this message, if any.

[`audio`](../modules/custom.html#telethon.tl.custom.message.Message.audio "telethon.tl.custom.message.Message.audio")

The [Document](https://tl.telethon.dev/?q=Document) media in this message, if it's an audio file.

[`voice`](../modules/custom.html#telethon.tl.custom.message.Message.voice "telethon.tl.custom.message.Message.voice")

The [Document](https://tl.telethon.dev/?q=Document) media in this message, if it's a voice note.

[`video`](../modules/custom.html#telethon.tl.custom.message.Message.video "telethon.tl.custom.message.Message.video")

The [Document](https://tl.telethon.dev/?q=Document) media in this message, if it's a video.

[`video_note`](../modules/custom.html#telethon.tl.custom.message.Message.video_note "telethon.tl.custom.message.Message.video_note")

The [Document](https://tl.telethon.dev/?q=Document) media in this message, if it's a video note.

[`gif`](../modules/custom.html#telethon.tl.custom.message.Message.gif "telethon.tl.custom.message.Message.gif")

The [Document](https://tl.telethon.dev/?q=Document) media in this message, if it's a "gif".

[`sticker`](../modules/custom.html#telethon.tl.custom.message.Message.sticker "telethon.tl.custom.message.Message.sticker")

The [Document](https://tl.telethon.dev/?q=Document) media in this message, if it's a sticker.

[`contact`](../modules/custom.html#telethon.tl.custom.message.Message.contact "telethon.tl.custom.message.Message.contact")

The [MessageMediaContact](https://tl.telethon.dev/?q=MessageMediaContact) in this message, if it's a contact.

[`game`](../modules/custom.html#telethon.tl.custom.message.Message.game "telethon.tl.custom.message.Message.game")

The [Game](https://tl.telethon.dev/?q=Game) media in this message, if it's a game.

[`geo`](../modules/custom.html#telethon.tl.custom.message.Message.geo "telethon.tl.custom.message.Message.geo")

The [GeoPoint](https://tl.telethon.dev/?q=GeoPoint) media in this message, if it has a location.

[`invoice`](../modules/custom.html#telethon.tl.custom.message.Message.invoice "telethon.tl.custom.message.Message.invoice")

The [MessageMediaInvoice](https://tl.telethon.dev/?q=MessageMediaInvoice) in this message, if it's an invoice.

[`poll`](../modules/custom.html#telethon.tl.custom.message.Message.poll "telethon.tl.custom.message.Message.poll")

The [MessageMediaPoll](https://tl.telethon.dev/?q=MessageMediaPoll) in this message, if it's a poll.

[`venue`](../modules/custom.html#telethon.tl.custom.message.Message.venue "telethon.tl.custom.message.Message.venue")

The [MessageMediaVenue](https://tl.telethon.dev/?q=MessageMediaVenue) in this message, if it's a venue.

[`action_entities`](../modules/custom.html#telethon.tl.custom.message.Message.action_entities "telethon.tl.custom.message.Message.action_entities")

Returns a list of entities that took part in this action.

[`via_bot`](../modules/custom.html#telethon.tl.custom.message.Message.via_bot "telethon.tl.custom.message.Message.via_bot")

The bot [User](https://tl.telethon.dev/?q=User) if the message was sent via said bot.

[`via_input_bot`](../modules/custom.html#telethon.tl.custom.message.Message.via_input_bot "telethon.tl.custom.message.Message.via_input_bot")

Returns the input variant of [`via_bot`](../modules/custom.html#telethon.tl.custom.message.Message.via_bot "telethon.tl.custom.message.Message.via_bot").

[`client`](../modules/custom.html#telethon.tl.custom.message.Message.client "telethon.tl.custom.message.Message.client")

Returns the [`TelegramClient`](../modules/client.html#telethon.client.telegramclient.TelegramClient "telethon.client.telegramclient.TelegramClient") that _patched_ this message.

### [Methods](#id6)[](#methods "Link to this heading")

[`respond`](../modules/custom.html#telethon.tl.custom.message.Message.respond "telethon.tl.custom.message.Message.respond")

Responds to the message (not as a reply).

[`reply`](../modules/custom.html#telethon.tl.custom.message.Message.reply "telethon.tl.custom.message.Message.reply")

Replies to the message (as a reply).

[`forward_to`](../modules/custom.html#telethon.tl.custom.message.Message.forward_to "telethon.tl.custom.message.Message.forward_to")

Forwards the message.

[`edit`](../modules/custom.html#telethon.tl.custom.message.Message.edit "telethon.tl.custom.message.Message.edit")

Edits the message if it's outgoing.

[`delete`](../modules/custom.html#telethon.tl.custom.message.Message.delete "telethon.tl.custom.message.Message.delete")

Deletes the message.

[`get_reply_message`](../modules/custom.html#telethon.tl.custom.message.Message.get_reply_message "telethon.tl.custom.message.Message.get_reply_message")

The `Message` that this message is replying to, or [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.14)").

[`click`](../modules/custom.html#telethon.tl.custom.message.Message.click "telethon.tl.custom.message.Message.click")

Calls [SendVote](https://tl.telethon.dev/?q=SendVote) with the specified poll option or [`button.click`](../modules/custom.html#telethon.tl.custom.messagebutton.MessageButton.click "telethon.tl.custom.messagebutton.MessageButton.click") on the specified button.

[`mark_read`](../modules/custom.html#telethon.tl.custom.message.Message.mark_read "telethon.tl.custom.message.Message.mark_read")

Marks the message as read.

[`pin`](../modules/custom.html#telethon.tl.custom.message.Message.pin "telethon.tl.custom.message.Message.pin")

Pins the message.

[`download_media`](../modules/custom.html#telethon.tl.custom.message.Message.download_media "telethon.tl.custom.message.Message.download_media")

Downloads the media contained in the message, if any.

[`get_entities_text`](../modules/custom.html#telethon.tl.custom.message.Message.get_entities_text "telethon.tl.custom.message.Message.get_entities_text")

Returns a list of `(markup entity, inner text)` (like bold or italics).

[`get_buttons`](../modules/custom.html#telethon.tl.custom.message.Message.get_buttons "telethon.tl.custom.message.Message.get_buttons")

Returns [`buttons`](../modules/custom.html#telethon.tl.custom.message.Message.buttons "telethon.tl.custom.message.Message.buttons") when that property fails (this is rarely needed).

## [File](#id7)[](#file "Link to this heading")

The [`File`](../modules/custom.html#telethon.tl.custom.file.File "telethon.tl.custom.file.File") type is a wrapper object returned by [`Message.file`](../modules/custom.html#telethon.tl.custom.message.Message.file "telethon.tl.custom.message.Message.file"), and you can use it to easily access a document’s attributes, such as its name, bot-API style file ID, etc.

[`id`](../modules/custom.html#telethon.tl.custom.file.File.id "telethon.tl.custom.file.File.id")

The old bot-API style `file_id` representing this file.

[`name`](../modules/custom.html#telethon.tl.custom.file.File.name "telethon.tl.custom.file.File.name")

The file name of this document.

[`ext`](../modules/custom.html#telethon.tl.custom.file.File.ext "telethon.tl.custom.file.File.ext")

The extension from the mime type of this file.

[`mime_type`](../modules/custom.html#telethon.tl.custom.file.File.mime_type "telethon.tl.custom.file.File.mime_type")

The mime-type of this file.

[`width`](../modules/custom.html#telethon.tl.custom.file.File.width "telethon.tl.custom.file.File.width")

The width in pixels of this media if it's a photo or a video.

[`height`](../modules/custom.html#telethon.tl.custom.file.File.height "telethon.tl.custom.file.File.height")

The height in pixels of this media if it's a photo or a video.

[`size`](../modules/custom.html#telethon.tl.custom.file.File.size "telethon.tl.custom.file.File.size")

The size in bytes of this file.

[`duration`](../modules/custom.html#telethon.tl.custom.file.File.duration "telethon.tl.custom.file.File.duration")

The duration in seconds of the audio or video.

[`title`](../modules/custom.html#telethon.tl.custom.file.File.title "telethon.tl.custom.file.File.title")

The title of the song.

[`performer`](../modules/custom.html#telethon.tl.custom.file.File.performer "telethon.tl.custom.file.File.performer")

The performer of the song.

[`emoji`](../modules/custom.html#telethon.tl.custom.file.File.emoji "telethon.tl.custom.file.File.emoji")

A string with all emoji that represent the current sticker.

[`sticker_set`](../modules/custom.html#telethon.tl.custom.file.File.sticker_set "telethon.tl.custom.file.File.sticker_set")

The [InputStickerSet](https://tl.telethon.dev/?q=InputStickerSet) to which the sticker file belongs.

## [Conversation](#id8)[](#conversation "Link to this heading")

The [`Conversation`](../modules/custom.html#telethon.tl.custom.conversation.Conversation "telethon.tl.custom.conversation.Conversation") object is returned by the [`client.conversation()`](../modules/client.html#telethon.client.dialogs.DialogMethods.conversation "telethon.client.dialogs.DialogMethods.conversation") method to easily send and receive responses like a normal conversation.

It bases [`ChatGetter`](../modules/custom.html#telethon.tl.custom.chatgetter.ChatGetter "telethon.tl.custom.chatgetter.ChatGetter").

[`send_message`](../modules/custom.html#telethon.tl.custom.conversation.Conversation.send_message "telethon.tl.custom.conversation.Conversation.send_message")

Sends a message in the context of this conversation.

[`send_file`](../modules/custom.html#telethon.tl.custom.conversation.Conversation.send_file "telethon.tl.custom.conversation.Conversation.send_file")

Sends a file in the context of this conversation.

[`mark_read`](../modules/custom.html#telethon.tl.custom.conversation.Conversation.mark_read "telethon.tl.custom.conversation.Conversation.mark_read")

Marks as read the latest received message if `message is None`.

[`get_response`](../modules/custom.html#telethon.tl.custom.conversation.Conversation.get_response "telethon.tl.custom.conversation.Conversation.get_response")

Gets the next message that responds to a previous one.

[`get_reply`](../modules/custom.html#telethon.tl.custom.conversation.Conversation.get_reply "telethon.tl.custom.conversation.Conversation.get_reply")

Gets the next message that explicitly replies to a previous one.

[`get_edit`](../modules/custom.html#telethon.tl.custom.conversation.Conversation.get_edit "telethon.tl.custom.conversation.Conversation.get_edit")

Awaits for an edit after the last message to arrive.

[`wait_read`](../modules/custom.html#telethon.tl.custom.conversation.Conversation.wait_read "telethon.tl.custom.conversation.Conversation.wait_read")

Awaits for the sent message to be marked as read.

[`wait_event`](../modules/custom.html#telethon.tl.custom.conversation.Conversation.wait_event "telethon.tl.custom.conversation.Conversation.wait_event")

Waits for a custom event to occur.

[`cancel`](../modules/custom.html#telethon.tl.custom.conversation.Conversation.cancel "telethon.tl.custom.conversation.Conversation.cancel")

Cancels the current conversation.

[`cancel_all`](../modules/custom.html#telethon.tl.custom.conversation.Conversation.cancel_all "telethon.tl.custom.conversation.Conversation.cancel_all")

Calls [`cancel`](../modules/custom.html#telethon.tl.custom.conversation.Conversation.cancel "telethon.tl.custom.conversation.Conversation.cancel") on _all_ conversations in this chat.

## [AdminLogEvent](#id9)[](#adminlogevent "Link to this heading")

The [`AdminLogEvent`](../modules/custom.html#telethon.tl.custom.adminlogevent.AdminLogEvent "telethon.tl.custom.adminlogevent.AdminLogEvent") object is returned by the [`client.iter_admin_log()`](../modules/client.html#telethon.client.chats.ChatMethods.iter_admin_log "telethon.client.chats.ChatMethods.iter_admin_log") method to easily iterate over past “events” (deleted messages, edits, title changes, leaving members…)

These are all the properties you can find in it:

[`id`](../modules/custom.html#telethon.tl.custom.adminlogevent.AdminLogEvent.id "telethon.tl.custom.adminlogevent.AdminLogEvent.id")

The ID of this event.

[`date`](../modules/custom.html#telethon.tl.custom.adminlogevent.AdminLogEvent.date "telethon.tl.custom.adminlogevent.AdminLogEvent.date")

The date when this event occurred.

[`user_id`](../modules/custom.html#telethon.tl.custom.adminlogevent.AdminLogEvent.user_id "telethon.tl.custom.adminlogevent.AdminLogEvent.user_id")

The ID of the user that triggered this event.

[`action`](../modules/custom.html#telethon.tl.custom.adminlogevent.AdminLogEvent.action "telethon.tl.custom.adminlogevent.AdminLogEvent.action")

The original [ChannelAdminLogEventAction](https://tl.telethon.dev/?q=ChannelAdminLogEventAction).

[`old`](../modules/custom.html#telethon.tl.custom.adminlogevent.AdminLogEvent.old "telethon.tl.custom.adminlogevent.AdminLogEvent.old")

The old value from the event.

[`new`](../modules/custom.html#telethon.tl.custom.adminlogevent.AdminLogEvent.new "telethon.tl.custom.adminlogevent.AdminLogEvent.new")

The new value present in the event.

[`changed_about`](../modules/custom.html#telethon.tl.custom.adminlogevent.AdminLogEvent.changed_about "telethon.tl.custom.adminlogevent.AdminLogEvent.changed_about")

Whether the channel's about was changed or not.

[`changed_title`](../modules/custom.html#telethon.tl.custom.adminlogevent.AdminLogEvent.changed_title "telethon.tl.custom.adminlogevent.AdminLogEvent.changed_title")

Whether the channel's title was changed or not.

[`changed_username`](../modules/custom.html#telethon.tl.custom.adminlogevent.AdminLogEvent.changed_username "telethon.tl.custom.adminlogevent.AdminLogEvent.changed_username")

Whether the channel's username was changed or not.

[`changed_photo`](../modules/custom.html#telethon.tl.custom.adminlogevent.AdminLogEvent.changed_photo "telethon.tl.custom.adminlogevent.AdminLogEvent.changed_photo")

Whether the channel's photo was changed or not.

[`changed_sticker_set`](../modules/custom.html#telethon.tl.custom.adminlogevent.AdminLogEvent.changed_sticker_set "telethon.tl.custom.adminlogevent.AdminLogEvent.changed_sticker_set")

Whether the channel's sticker set was changed or not.

[`changed_message`](../modules/custom.html#telethon.tl.custom.adminlogevent.AdminLogEvent.changed_message "telethon.tl.custom.adminlogevent.AdminLogEvent.changed_message")

Whether a message in this channel was edited or not.

[`deleted_message`](../modules/custom.html#telethon.tl.custom.adminlogevent.AdminLogEvent.deleted_message "telethon.tl.custom.adminlogevent.AdminLogEvent.deleted_message")

Whether a message in this channel was deleted or not.

[`changed_admin`](../modules/custom.html#telethon.tl.custom.adminlogevent.AdminLogEvent.changed_admin "telethon.tl.custom.adminlogevent.AdminLogEvent.changed_admin")

Whether the permissions for an admin in this channel changed or not.

[`changed_restrictions`](../modules/custom.html#telethon.tl.custom.adminlogevent.AdminLogEvent.changed_restrictions "telethon.tl.custom.adminlogevent.AdminLogEvent.changed_restrictions")

Whether a message in this channel was edited or not.

[`changed_invites`](../modules/custom.html#telethon.tl.custom.adminlogevent.AdminLogEvent.changed_invites "telethon.tl.custom.adminlogevent.AdminLogEvent.changed_invites")

Whether the invites in the channel were toggled or not.

[`joined`](../modules/custom.html#telethon.tl.custom.adminlogevent.AdminLogEvent.joined "telethon.tl.custom.adminlogevent.AdminLogEvent.joined")

Whether `user` joined through the channel's public username or not.

[`joined_invite`](../modules/custom.html#telethon.tl.custom.adminlogevent.AdminLogEvent.joined_invite "telethon.tl.custom.adminlogevent.AdminLogEvent.joined_invite")

Whether a new user joined through an invite link to the channel or not.

[`left`](../modules/custom.html#telethon.tl.custom.adminlogevent.AdminLogEvent.left "telethon.tl.custom.adminlogevent.AdminLogEvent.left")

Whether `user` left the channel or not.

[`changed_hide_history`](../modules/custom.html#telethon.tl.custom.adminlogevent.AdminLogEvent.changed_hide_history "telethon.tl.custom.adminlogevent.AdminLogEvent.changed_hide_history")

Whether hiding the previous message history for new members in the channel was toggled or not.

[`changed_signatures`](../modules/custom.html#telethon.tl.custom.adminlogevent.AdminLogEvent.changed_signatures "telethon.tl.custom.adminlogevent.AdminLogEvent.changed_signatures")

Whether the message signatures in the channel were toggled or not.

[`changed_pin`](../modules/custom.html#telethon.tl.custom.adminlogevent.AdminLogEvent.changed_pin "telethon.tl.custom.adminlogevent.AdminLogEvent.changed_pin")

Whether a new message in this channel was pinned or not.

[`changed_default_banned_rights`](../modules/custom.html#telethon.tl.custom.adminlogevent.AdminLogEvent.changed_default_banned_rights "telethon.tl.custom.adminlogevent.AdminLogEvent.changed_default_banned_rights")

Whether the default banned rights were changed or not.

[`stopped_poll`](../modules/custom.html#telethon.tl.custom.adminlogevent.AdminLogEvent.stopped_poll "telethon.tl.custom.adminlogevent.AdminLogEvent.stopped_poll")

Whether a poll was stopped or not.

## [Button](#id10)[](#button "Link to this heading")

The [`Button`](../modules/custom.html#telethon.tl.custom.button.Button "telethon.tl.custom.button.Button") class is used when you login as a bot account to send messages with reply markup, such as inline buttons or custom keyboards.

These are the static methods you can use to create instances of the markup:

[`inline`](../modules/custom.html#telethon.tl.custom.button.Button.inline "telethon.tl.custom.button.Button.inline")

Creates a new inline button with some payload data in it.

[`switch_inline`](../modules/custom.html#telethon.tl.custom.button.Button.switch_inline "telethon.tl.custom.button.Button.switch_inline")

Creates a new inline button to switch to inline query.

[`url`](../modules/custom.html#telethon.tl.custom.button.Button.url "telethon.tl.custom.button.Button.url")

Creates a new inline button to open the desired URL on click.

[`auth`](../modules/custom.html#telethon.tl.custom.button.Button.auth "telethon.tl.custom.button.Button.auth")

Creates a new inline button to authorize the user at the given URL.

[`text`](../modules/custom.html#telethon.tl.custom.button.Button.text "telethon.tl.custom.button.Button.text")

Creates a new keyboard button with the given text.

[`request_location`](../modules/custom.html#telethon.tl.custom.button.Button.request_location "telethon.tl.custom.button.Button.request_location")

Creates a new keyboard button to request the user's location on click.

[`request_phone`](../modules/custom.html#telethon.tl.custom.button.Button.request_phone "telethon.tl.custom.button.Button.request_phone")

Creates a new keyboard button to request the user's phone on click.

[`request_poll`](../modules/custom.html#telethon.tl.custom.button.Button.request_poll "telethon.tl.custom.button.Button.request_poll")

Creates a new keyboard button to request the user to create a poll.

[`clear`](../modules/custom.html#telethon.tl.custom.button.Button.clear "telethon.tl.custom.button.Button.clear")

Clears all keyboard buttons after sending a message with this markup.

[`force_reply`](../modules/custom.html#telethon.tl.custom.button.Button.force_reply "telethon.tl.custom.button.Button.force_reply")

Forces a reply to the message with this markup.

## [InlineResult](#id11)[](#inlineresult "Link to this heading")

The [`InlineResult`](../modules/custom.html#telethon.tl.custom.inlineresult.InlineResult "telethon.tl.custom.inlineresult.InlineResult") object is returned inside a list by the [`client.inline_query()`](../modules/client.html#telethon.client.bots.BotMethods.inline_query "telethon.client.bots.BotMethods.inline_query") method to make an inline query to a bot that supports being used in inline mode, such as [@like](https://t.me/like).

Note that the list returned is in fact a _subclass_ of a list called [`InlineResults`](../modules/custom.html#telethon.tl.custom.inlineresults.InlineResults "telethon.tl.custom.inlineresults.InlineResults"), which, in addition of being a list (iterator, indexed access, etc.), has extra attributes and methods.

These are the constants for the types, properties and methods you can find the individual results:

[`ARTICLE`](../modules/custom.html#telethon.tl.custom.inlineresult.InlineResult.ARTICLE "telethon.tl.custom.inlineresult.InlineResult.ARTICLE")

[`PHOTO`](../modules/custom.html#telethon.tl.custom.inlineresult.InlineResult.PHOTO "telethon.tl.custom.inlineresult.InlineResult.PHOTO")

[`GIF`](../modules/custom.html#telethon.tl.custom.inlineresult.InlineResult.GIF "telethon.tl.custom.inlineresult.InlineResult.GIF")

[`VIDEO`](../modules/custom.html#telethon.tl.custom.inlineresult.InlineResult.VIDEO "telethon.tl.custom.inlineresult.InlineResult.VIDEO")

[`VIDEO_GIF`](../modules/custom.html#telethon.tl.custom.inlineresult.InlineResult.VIDEO_GIF "telethon.tl.custom.inlineresult.InlineResult.VIDEO_GIF")

[`AUDIO`](../modules/custom.html#telethon.tl.custom.inlineresult.InlineResult.AUDIO "telethon.tl.custom.inlineresult.InlineResult.AUDIO")

[`DOCUMENT`](../modules/custom.html#telethon.tl.custom.inlineresult.InlineResult.DOCUMENT "telethon.tl.custom.inlineresult.InlineResult.DOCUMENT")

[`LOCATION`](../modules/custom.html#telethon.tl.custom.inlineresult.InlineResult.LOCATION "telethon.tl.custom.inlineresult.InlineResult.LOCATION")

[`VENUE`](../modules/custom.html#telethon.tl.custom.inlineresult.InlineResult.VENUE "telethon.tl.custom.inlineresult.InlineResult.VENUE")

[`CONTACT`](../modules/custom.html#telethon.tl.custom.inlineresult.InlineResult.CONTACT "telethon.tl.custom.inlineresult.InlineResult.CONTACT")

[`GAME`](../modules/custom.html#telethon.tl.custom.inlineresult.InlineResult.GAME "telethon.tl.custom.inlineresult.InlineResult.GAME")

[`type`](../modules/custom.html#telethon.tl.custom.inlineresult.InlineResult.type "telethon.tl.custom.inlineresult.InlineResult.type")

The always-present type of this result.

[`message`](../modules/custom.html#telethon.tl.custom.inlineresult.InlineResult.message "telethon.tl.custom.inlineresult.InlineResult.message")

The always-present [BotInlineMessage](https://tl.telethon.dev/?q=BotInlineMessage) that will be sent if [`click`](../modules/custom.html#telethon.tl.custom.inlineresult.InlineResult.click "telethon.tl.custom.inlineresult.InlineResult.click") is called on this result.

[`title`](../modules/custom.html#telethon.tl.custom.inlineresult.InlineResult.title "telethon.tl.custom.inlineresult.InlineResult.title")

The title for this inline result.

[`description`](../modules/custom.html#telethon.tl.custom.inlineresult.InlineResult.description "telethon.tl.custom.inlineresult.InlineResult.description")

The description for this inline result.

[`url`](../modules/custom.html#telethon.tl.custom.inlineresult.InlineResult.url "telethon.tl.custom.inlineresult.InlineResult.url")

The URL present in this inline results.

[`photo`](../modules/custom.html#telethon.tl.custom.inlineresult.InlineResult.photo "telethon.tl.custom.inlineresult.InlineResult.photo")

Returns either the [WebDocument](https://tl.telethon.dev/?q=WebDocument) thumbnail for normal results or the [Photo](https://tl.telethon.dev/?q=Photo) for media results.

[`document`](../modules/custom.html#telethon.tl.custom.inlineresult.InlineResult.document "telethon.tl.custom.inlineresult.InlineResult.document")

Returns either the [WebDocument](https://tl.telethon.dev/?q=WebDocument) content for normal results or the [Document](https://tl.telethon.dev/?q=Document) for media results.

[`click`](../modules/custom.html#telethon.tl.custom.inlineresult.InlineResult.click "telethon.tl.custom.inlineresult.InlineResult.click")

Clicks this result and sends the associated [`message`](../modules/custom.html#telethon.tl.custom.inlineresult.InlineResult.message "telethon.tl.custom.inlineresult.InlineResult.message").

[`download_media`](../modules/custom.html#telethon.tl.custom.inlineresult.InlineResult.download_media "telethon.tl.custom.inlineresult.InlineResult.download_media")

Downloads the media in this result (if there is a document, the document will be downloaded; otherwise, the photo will if present).

## [Dialog](#id12)[](#dialog "Link to this heading")

The [`Dialog`](../modules/custom.html#telethon.tl.custom.dialog.Dialog "telethon.tl.custom.dialog.Dialog") object is returned when you call [`client.iter_dialogs()`](../modules/client.html#telethon.client.dialogs.DialogMethods.iter_dialogs "telethon.client.dialogs.DialogMethods.iter_dialogs").

[`send_message`](../modules/custom.html#telethon.tl.custom.dialog.Dialog.send_message "telethon.tl.custom.dialog.Dialog.send_message")

Sends a message to this dialog.

[`archive`](../modules/custom.html#telethon.tl.custom.dialog.Dialog.archive "telethon.tl.custom.dialog.Dialog.archive")

Archives (or un-archives) this dialog.

[`delete`](../modules/custom.html#telethon.tl.custom.dialog.Dialog.delete "telethon.tl.custom.dialog.Dialog.delete")

Deletes the dialog from your dialog list.

## [Draft](#id13)[](#draft "Link to this heading")

The [`Draft`](../modules/custom.html#telethon.tl.custom.draft.Draft "telethon.tl.custom.draft.Draft") object is returned when you call [`client.iter_drafts()`](../modules/client.html#telethon.client.dialogs.DialogMethods.iter_drafts "telethon.client.dialogs.DialogMethods.iter_drafts").

[`entity`](../modules/custom.html#telethon.tl.custom.draft.Draft.entity "telethon.tl.custom.draft.Draft.entity")

The entity that belongs to this dialog (user, chat or channel).

[`input_entity`](../modules/custom.html#telethon.tl.custom.draft.Draft.input_entity "telethon.tl.custom.draft.Draft.input_entity")

Input version of the entity.

[`get_entity`](../modules/custom.html#telethon.tl.custom.draft.Draft.get_entity "telethon.tl.custom.draft.Draft.get_entity")

Returns [`entity`](../modules/custom.html#telethon.tl.custom.draft.Draft.entity "telethon.tl.custom.draft.Draft.entity") but will make an API call if necessary.

[`get_input_entity`](../modules/custom.html#telethon.tl.custom.draft.Draft.get_input_entity "telethon.tl.custom.draft.Draft.get_input_entity")

Returns [`input_entity`](../modules/custom.html#telethon.tl.custom.draft.Draft.input_entity "telethon.tl.custom.draft.Draft.input_entity") but will make an API call if necessary.

[`text`](../modules/custom.html#telethon.tl.custom.draft.Draft.text "telethon.tl.custom.draft.Draft.text")

The markdown text contained in the draft.

[`raw_text`](../modules/custom.html#telethon.tl.custom.draft.Draft.raw_text "telethon.tl.custom.draft.Draft.raw_text")

The raw (text without formatting) contained in the draft.

[`is_empty`](../modules/custom.html#telethon.tl.custom.draft.Draft.is_empty "telethon.tl.custom.draft.Draft.is_empty")

Convenience bool to determine if the draft is empty or not.

[`set_message`](../modules/custom.html#telethon.tl.custom.draft.Draft.set_message "telethon.tl.custom.draft.Draft.set_message")

Changes the draft message on the Telegram servers.

[`send`](../modules/custom.html#telethon.tl.custom.draft.Draft.send "telethon.tl.custom.draft.Draft.send")

Sends the contents of this draft to the dialog.

[`delete`](../modules/custom.html#telethon.tl.custom.draft.Draft.delete "telethon.tl.custom.draft.Draft.delete")

Deletes this draft, and returns [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.14)") on success.

## [Utils](#id14)[](#utils "Link to this heading")

The [`telethon.utils`](../modules/utils.html#module-telethon.utils "telethon.utils") module has plenty of methods that make using the library a lot easier. Only the interesting ones will be listed here.

[`get_display_name`](../modules/utils.html#telethon.utils.get_display_name "telethon.utils.get_display_name")

Gets the display name for the given [User](https://tl.telethon.dev/?q=User), [Chat](https://tl.telethon.dev/?q=Chat) or [Channel](https://tl.telethon.dev/?q=Channel).

[`get_extension`](../modules/utils.html#telethon.utils.get_extension "telethon.utils.get_extension")

Gets the corresponding extension for any Telegram media.

[`get_inner_text`](../modules/utils.html#telethon.utils.get_inner_text "telethon.utils.get_inner_text")

Gets the inner text that's surrounded by the given entities.

[`get_peer_id`](../modules/utils.html#telethon.utils.get_peer_id "telethon.utils.get_peer_id")

Convert the given peer into its marked ID by default.

[`resolve_id`](../modules/utils.html#telethon.utils.resolve_id "telethon.utils.resolve_id")

Given a marked ID, returns the original ID and its [Peer](https://tl.telethon.dev/?q=Peer) type.

[`pack_bot_file_id`](../modules/utils.html#telethon.utils.pack_bot_file_id "telethon.utils.pack_bot_file_id")

Inverse operation for [`resolve_bot_file_id`](../modules/utils.html#telethon.utils.resolve_bot_file_id "telethon.utils.resolve_bot_file_id").

[`resolve_bot_file_id`](../modules/utils.html#telethon.utils.resolve_bot_file_id "telethon.utils.resolve_bot_file_id")

Given a Bot API-style [`file_id`](../modules/custom.html#telethon.tl.custom.file.File.id "telethon.tl.custom.file.File.id"), returns the media it represents.

[`resolve_invite_link`](../modules/utils.html#telethon.utils.resolve_invite_link "telethon.utils.resolve_invite_link")

Resolves the given invite link.

[Previous](events-reference.html "Events Reference") [Next](../concepts/strings.html "String-based Debugging")

* * *

© Copyright 2017 - 2019, Lonami.

Built with [Sphinx](https://www.sphinx-doc.org/) using a [theme](https://github.com/readthedocs/sphinx_rtd_theme) provided by [Read the Docs](https://readthedocs.org).

