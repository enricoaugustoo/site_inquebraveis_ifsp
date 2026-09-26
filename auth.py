from functools import wraps
from flask import session, redirect, url_for


def login_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if not session.get("admin_logado"):
            return redirect(url_for("admin_login"))
        return view(*args, **kwargs)

    return wrapped
